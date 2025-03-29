const express = require("express");
const { google } = require("googleapis");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

const getOrCreateWarrantyMeFolder = async (drive) => {
  try {
    const response = await drive.files.list({
      q: "name='WarrantyMe' and mimeType='application/vnd.google-apps.folder'",
      fields: "files(id, name)",
    });
    console.log(response);
    if (response.data.files.length > 0) {
      return response.data.files[0].id; 
    }

    const folderMetadata = {
      name: "WarrantyMe",
      mimeType: "application/vnd.google-apps.folder",
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: "id",
    });

    return folder.data.id; 
  } catch (error) {
    console.error("Error ensuring WarrantyMe folder:", error);
    throw new Error("Failed to create or find WarrantyMe folder");
  }
};


router.post("/upload", authenticate, async (req, res) => {
  try {
    console.log("ochindhi raa");
    const { title, textContent } = req.body;
    console.log(textContent);

    if (!title || !textContent) {
      return res.status(400).json({ error: "Title and content are required" });
    }
 
    const auth = new google.auth.OAuth2();

    auth.setCredentials({ access_token: req.user.googleToken });

    const drive = google.drive({ version: "v3", auth });

    const folderId = await getOrCreateWarrantyMeFolder(drive);

    const fileMetadata = {
      name: `${title}.docx`,
      mimeType: "application/vnd.google-apps.document",
      parents: [folderId],
    };

    const media = {
      mimeType: "text/plain",
      body: textContent,
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });

    res.json({ message: "Uploaded to Drive successfully!", fileId: file.data.id });
  } catch (error) {
    console.error(" Drive upload error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.user.googleToken });

    const drive = google.drive({ version: "v3", auth });

    const folderId = await getOrCreateWarrantyMeFolder(drive);

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, webViewLink)",
    });

    if (response.data.files.length === 0) {
      return res.json({ message: "No documents found in WarrantyMe folder", files: [] });
    }

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      link: `https://drive.google.com/file/d/${file.id}/view`,
    }));

    res.json({ message: "Fetched documents successfully", files });
  } catch (error) {
    console.error("Drive fetch error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch documents", details: error.message });
  }
});

router.get("/fetch/:fileId", authenticate, async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.user.googleToken });

    const drive = google.drive({ version: "v3", auth });
    const fileMetadata = await drive.files.get({ fileId, fields: "mimeType" });

    let content = "";
    if (fileMetadata.data.mimeType === "application/vnd.google-apps.document") {
      
      const response = await drive.files.export({
        fileId,
        mimeType: "text/plain",
      });

      content = response.data;
    } else {
      // Fetch file content for other file types
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "stream" }
      );

      let data = "";
      response.data.on("data", (chunk) => {
        data += chunk;
      });

      response.data.on("end", () => {
        res.json({ fileId, content: data });
      });

      return;
    }

    res.json({ fileId, content });
  } catch (error) {
    console.error("Drive fetch file error:", error.message);
    res.status(500).json({ error: "Failed to fetch file content", details: error.message });
  }
});

module.exports = router;