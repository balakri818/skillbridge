const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Added to match Abstract: "Watch, Read, Practice, Test"
    videoUrl: {
      type: String, 
      default: "" // For "Watch"
    },
    readingMaterial: {
      type: String,
      default: "" // For "Read"
    },
    practiceAssignment: {
      type: String,
      default: "" // For "Practice"
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);