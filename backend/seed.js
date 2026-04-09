require("dotenv").config();
const mongoose = require("mongoose");

const Skill = require("./models/skill.model");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Skill.deleteMany();

    await Skill.insertMany([
      {
        title: "DSA",
        description: "Data Structures and Algorithms",
        topics: [
          { name: "Arrays", content: "Arrays store elements in contiguous memory." },
          { name: "Strings", content: "Strings are sequences of characters." },
          { name: "Linked Lists", content: "Linked lists are dynamic structures." },
          { name: "Trees", content: "Trees represent hierarchical data." },
        ],
      },
      {
        title: "Web Development",
        description: "Frontend and Backend Development",
        topics: [
          { name: "HTML", content: "HTML structures web pages." },
          { name: "CSS", content: "CSS styles web pages." },
          { name: "JavaScript", content: "JavaScript adds interactivity." },
          { name: "React", content: "React builds UI components." },
        ],
      },
    ]);

    console.log("Skills inserted");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });