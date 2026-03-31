const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillPath: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);