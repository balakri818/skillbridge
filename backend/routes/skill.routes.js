const express = require("express");
const router = express.Router();
const Skill = require("../models/skill.model");
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

// Admin: Add a new skill
router.post("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, description } = req.body;

    const skill = new Skill({
      title,
      description,
    });

    await skill.save();

    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add skill" });
  }
});

// Student/Admin: Get all skills
router.get("/", authMiddleware, async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
});

module.exports = router;
