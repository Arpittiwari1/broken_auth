const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token.replace("Bearer ", "").trim(), secret);
    req.user = decoded;
    return next(); // next was not called so the request was not proceeding ahead
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
