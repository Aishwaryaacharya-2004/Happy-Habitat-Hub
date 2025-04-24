const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  console.log("🔍 Request Headers:", req.headers);

  if (!req.headers.authorization) {
    console.log("⛔ No Authorization Header Found");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log("📌 Extracted Token:", token);

  if (!token) {
    console.log("⛔ Token Missing from Authorization Header");
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Verified. User:", req.user);
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
