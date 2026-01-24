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
    // Resource Links (Video Removed)
    readingMaterial: { type: String, default: "" }, // "Read"
    practiceAssignment: { type: String, default: "" }, // "Practice"
    
    // Quiz Module (Test)
    quizQuestion: { type: String, default: "" },
    quizOptions: [{ type: String }], 
    correctAnswer: { type: String, default: "" }, 

    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);