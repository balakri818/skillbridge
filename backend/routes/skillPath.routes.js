const express = require("express");
const router = express.Router();
const SkillPath = require("../models/skillPath.model");
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

// Admin: Create a new Skill Path (Organize skills into a track)
router.post("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, description, skills } = req.body;
    // skills should be an array of Skill IDs
    const skillPath = new SkillPath({
      title,
      description,
      skills, 
    });

    await skillPath.save();
    res.status(201).json({ message: "Skill Path created", skillPath });
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill path" });
  }
});

// Student/Admin: Get all Skill Paths with their details
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Populate the 'skills' field to show details (Watch/Read links) inside the path
    const skillPaths = await SkillPath.find().populate("skills");
    res.json(skillPaths);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skill paths" });
  }
});

module.exports = router;