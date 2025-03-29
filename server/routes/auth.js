const express = require("express");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Google OAuth login URL
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive", "profile", "email"],
  });
  res.redirect(url);
});

// Callback for Google OAuth
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const userInfo = await oauth2.userinfo.get();

  // Create JWT token
  const token = jwt.sign(
    { email: userInfo.data.email, name: userInfo.data.name, googleToken: tokens.access_token },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  res.redirect(`http://localhost:3000/editor?token=${token}`);
});

module.exports = router;
