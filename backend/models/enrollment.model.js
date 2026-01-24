const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillPath",
      required: true,
    },
    // CHANGED: We now track WHICH skills are done
    completedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    // We still keep this for easy dashboard display
    progress: {
      type: Number,
      default: 0, 
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);