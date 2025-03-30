import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Box, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import axios from "axios";

const Editor = ({ content, setContent }) => {
  const [open, setOpen] = useState(false);
  const [docName, setDocName] = useState("");
  const [actionType, setActionType] = useState(""); 

  const handleOpenDialog = (type) => {
    setActionType(type);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDocName("");
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No token found! Please log in.");
  
    if (!docName.trim()) return alert("Please enter a document name!");
    const plainTextContent = document.createElement("div");
    plainTextContent.innerHTML = content;
    const extractedContent = plainTextContent.textContent || plainTextContent.innerText || "";
  
    try {
      await axios.post(
        process.env.REACT_APP_SERVER_URL+"/drafts",
        { title: docName, content: extractedContent },  
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Draft saved successfully!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save draft.");
    }
  };  

  const handleUploadToDrive = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No token found! Please log in.");

    if (!docName.trim()) return alert("Please enter a document name!");
    const plainTextContent = document.createElement("div");
    plainTextContent.innerHTML = content;
    const textContent = plainTextContent.textContent || plainTextContent.innerText || "";
    
    try {
      await axios.post(
        "process.env.REACT_APP_SERVER_URL/drive/upload",
        { title: docName, textContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Uploaded to Google Drive!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to upload to Drive.");
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Paper sx={{ padding: 5, minHeight: "75%" }} elevation={0}>
        <ReactQuill
          style={{ width: "100%", height: "72vh", minHeight: "500px", border: "none" }}
          value={content}
          onChange={setContent}
          placeholder="Write your content here..."
        />
      </Paper>

      <Box sx={{ marginTop: 2, justifyContent: "center", display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog("save")}>
          Save
        </Button>
        <Button variant="contained" color="success" onClick={() => handleOpenDialog("upload")}>
          Upload to Google Drive
        </Button>
      </Box>

      {/* Dialog for entering document name */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Enter Document Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            label="Document Name"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {actionType === "save" ? (
            <Button onClick={handleSave} color="primary">
              Save as Draft
            </Button>
          ) : (
            <Button onClick={handleUploadToDrive} color="success">
              Upload to Drive
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Editor;
