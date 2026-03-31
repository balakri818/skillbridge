require("dotenv").config();
const mongoose = require("mongoose");

const Skill = require("./models/skill.model");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding");

    // ❌ Remove old skills
    await Skill.deleteMany();

    // ✅ Insert fixed skills
    await Skill.insertMany([
      {
        title: "DSA",
        description: "Data Structures and Algorithms",
        topics: ["Arrays", "Strings", "Linked Lists", "Trees"],
      },
      {
        title: "Web Development",
        description: "Frontend and Backend",
        topics: ["HTML", "CSS", "JavaScript", "React"],
      },
      {
        title: "DBMS",
        description: "Database Systems",
        topics: ["SQL", "Normalization", "Transactions"],
      },
    ]);

    console.log("✅ Skills inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });