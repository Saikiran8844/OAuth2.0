const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ error: "Access Denied" });
  const token = authHeader.split(" ")[1];

  if (!token) {
    console.error("Token is missing after Bearer");
    return res.status(401).json({ error: "Invalid Token Format" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Token is valid:");
    next();
  } catch (err) {
    console.error("Invalid token error:", err.message);
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = authenticate;  