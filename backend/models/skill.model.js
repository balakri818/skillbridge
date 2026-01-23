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
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
