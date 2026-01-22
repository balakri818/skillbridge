const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected route (JWT test)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

// Admin-only route
router.get("/admin/dashboard", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user,
  });
});

// Student route
router.get("/student/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome Student",
    student: req.user,
  });
});

module.exports = router;
