const User = require("../models/user.model");

const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error verifying role" });
  }
};

module.exports = adminOnly;
