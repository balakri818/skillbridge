const express = require("express");
const router = express.Router();
const Enrollment = require("../models/enrollment.model");
const SkillPath = require("../models/skillPath.model");
const authMiddleware = require("../middleware/auth.middleware");

// Student enrolls in a skill path
router.post("/", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;
    const { skillPathId } = req.body;

    // prevent duplicate enrollment
    const existing = await Enrollment.findOne({
      student: studentId,
      skillPath: skillPathId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled in this skill path",
      });
    }

    const enrollment = new Enrollment({
      student: studentId,
      skillPath: skillPathId,
    });

    await enrollment.save();

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// Get logged-in student's enrollments
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId })
      .populate("skillPath");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

module.exports = router;
