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
    progress: {
      type: Number,
      default: 0, // percentage
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
