const express = require("express");
const router = express.Router();
const Skill = require("../models/skill.model");

// Get all skills (public for logged-in users)
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
});

module.exports = router;