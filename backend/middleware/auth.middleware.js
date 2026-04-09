const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "No token provided, please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ VERY IMPORTANT
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};