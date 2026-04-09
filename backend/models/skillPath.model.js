const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: String,
  description: String,
  topics: [
    {
      name: String,
      content: String,
    },
  ],
});

module.exports = mongoose.model("Skill", skillSchema);