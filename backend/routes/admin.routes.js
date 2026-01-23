const express = require("express");
const router = express.Router();
const Skill = require("../models/skill.model");
const SkillPath = require("../models/skillPath.model");
const Enrollment = require("../models/enrollment.model");
const authMiddleware = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/role.middleware");

// Admin dashboard stats
router.get("/stats", authMiddleware, adminOnly, async (req, res) => {
  try {
    const totalSkills = await Skill.countDocuments();
    const totalSkillPaths = await SkillPath.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      totalSkills,
      totalSkillPaths,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
