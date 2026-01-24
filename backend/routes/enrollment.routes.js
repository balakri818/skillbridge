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

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      student: studentId,
      skillPath: skillPathId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({
      student: studentId,
      skillPath: skillPathId,
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// Get all enrollments for the student
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: "skillPath",
        populate: { path: "skills" } // Deep populate to count total skills
      });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

// GET Single Enrollment (For the Course Player Page)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate({
        path: "skillPath",
        populate: { path: "skills" } // Get the actual content (videos/links)
      });
      
    if (!enrollment) return res.status(404).json({ message: "Not found" });
    
    // Security check: ensure this enrollment belongs to the user
    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// TOGGLE COMPLETION (The Logic Engine)
router.put("/:id/toggle-complete", authMiddleware, async (req, res) => {
  try {
    const { skillId } = req.body;
    const enrollment = await Enrollment.findById(req.params.id).populate("skillPath");

    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Check if skill is already completed
    const index = enrollment.completedSkills.indexOf(skillId);
    
    if (index === -1) {
      // Not completed yet -> Add it
      enrollment.completedSkills.push(skillId);
    } else {
      // Already completed -> Remove it (Undo)
      enrollment.completedSkills.splice(index, 1);
    }

    // Recalculate Percentage
    const totalSkills = enrollment.skillPath.skills.length;
    const completedCount = enrollment.completedSkills.length;
    
    // Avoid division by zero
    enrollment.progress = totalSkills === 0 ? 0 : Math.round((completedCount / totalSkills) * 100);

    await enrollment.save();
    res.json({ message: "Progress updated", progress: enrollment.progress, completedSkills: enrollment.completedSkills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;