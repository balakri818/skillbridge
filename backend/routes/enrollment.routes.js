const express = require("express");
const router = express.Router();
const Enrollment = require("../models/enrollment.model");
const authMiddleware = require("../middleware/auth.middleware");

// Enroll
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { skillPathId } = req.body;

    if (!skillPathId) {
      return res.status(400).json({ message: "Skill ID required" });
    }

    // prevent duplicate enrollment
    const existing = await Enrollment.findOne({
      user: req.user.id,
      skillPath: skillPathId,
    });

    if (existing) {
      return res.json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({
      user: req.user.id,
      skillPath: skillPathId,
      progress: 0,
    });

    await enrollment.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// Get my enrollments
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("skillPath");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

// Update progress
router.put("/progress", authMiddleware, async (req, res) => {
  try {
    const { skillPathId, progress, completedTopicIndex } = req.body;

    if (!skillPathId || progress === undefined) {
      return res.status(400).json({ message: "Skill ID and progress required" });
    }

    const enrollment = await Enrollment.findOne({
      user: req.user.id,
      skillPath: skillPathId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.progress = progress;
    if (completedTopicIndex !== undefined && !enrollment.completedTopics.includes(completedTopicIndex)) {
      enrollment.completedTopics.push(completedTopicIndex);
    }

    await enrollment.save();

    res.json({ message: "Progress updated successfully", enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update progress" });
  }
});

module.exports = router;