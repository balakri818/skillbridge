const mongoose = require("mongoose");

const skillPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
});

module.exports = mongoose.model("SkillPath", skillPathSchema);