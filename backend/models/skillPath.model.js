const mongoose = require("mongoose");

const skillPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillPath", skillPathSchema);
