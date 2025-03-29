const express = require("express");
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get user's drafts
router.get("/", authenticate, async (req, res) => {
  try {
    
    const [rows] = await pool.query("SELECT * FROM drafts WHERE user_email = ?", [req.user.email]);
    res.json(rows);
  } catch (error) {
    console.error(" Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get draft by id
router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM drafts WHERE id = ? AND user_email = ?", [id, req.user.email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Draft not found" });
    }

    res.json(rows[0]); // Return the single draft object
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Save draft
router.post("/", authenticate, async (req, res) => {
  console.log("Received request body:", req.body);

  if (!req.body) {
    console.error(" No request body received");
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { title, content } = req.body;

  console.log("Extracted title:", title);
  console.log("Extracted content:", content);

  if (!title || !content) {
    console.error(" Missing title or content in request");
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    await pool.query(
      "INSERT INTO drafts (title, content, user_email) VALUES (?, ?, ?)", 
      [title, content, req.user.email]
    );

    console.log(" Draft saved successfully!");
    res.json({ message: "Draft saved successfully!" });
  } catch (error) {
    console.error(" Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
