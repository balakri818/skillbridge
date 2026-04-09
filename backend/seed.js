require("dotenv").config();
const mongoose = require("mongoose");

const Skill = require("./models/skill.model");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Skill.deleteMany();

    await Skill.insertMany([
      {
        title: "Data Structures & Algorithms",
        description: "Core CSE subject covering fundamental algorithms and memory optimization.",
        topics: [
          { name: "Time & Space Complexity", content: "Understanding Big O notation and algorithm efficiency." },
          { name: "Arrays & Strings", content: "Memory representation, sliding window technique, and string manipulation." },
          { name: "Linked Lists & Trees", content: "Creating nodes, traversing trees (BFS/DFS), and memory pointers." },
          { name: "Dynamic Programming", content: "Decomposing complex problems into simpler overlapping subproblems." },
        ],
      },
      {
        title: "Database Management Systems (DBMS)",
        description: "Learn how data is stored, retrieved, and managed securely.",
        topics: [
          { name: "Entity-Relationship Model", content: "Designing database tables through diagrammatic schemas." },
          { name: "SQL Constraints & Queries", content: "Writing complex JOINs, aggregate functions, and nested queries." },
          { name: "Normalization", content: "Reducing data redundancy with 1NF, 2NF, 3NF, and BCNF concepts." },
          { name: "Transaction Management", content: "Ensuring ACID properties and concurrent transactions control." },
        ],
      },
      {
        title: "Full-Stack Web Development",
        description: "Comprehensive guide to building end-to-end modern web applications.",
        topics: [
          { name: "Frontend Frameworks", content: "Using React or Vue for component-based reactive web architecture." },
          { name: "Backend APIs", content: "Building RESTful endpoints with Node.js and Express." },
          { name: "Authentication Middleware", content: "Implementing secure login states with JSON Web Tokens (JWT)." },
          { name: "Database Integration", content: "Connecting via ORMs like Mongoose to NoSQL or Prisma to SQL databases." },
        ],
      },
      {
        title: "Operating Systems",
        description: "Deep dive into system-level operations that manage hardware resources.",
        topics: [
          { name: "Process & Threads", content: "Lifecycle of a process, IPC, and thread level execution models." },
          { name: "CPU Scheduling Algorithms", content: "How Round-robin, FCFS, and priority scheduling work practically." },
          { name: "Memory Management", content: "Paging, segmentation, and virtual memory systems explained." },
          { name: "Deadlocks", content: "Banker's Algorithm and prevention strategies against resource holding." },
        ],
      },
      {
        title: "Machine Learning Concepts",
        description: "Introduction to training statistical models and prediction.",
        topics: [
          { name: "Linear Regression", content: "Simple continuous numerical prediction models." },
          { name: "Classification", content: "Logistic Regression, Decision Trees and SVMs." },
          { name: "Clustering Algorithms", content: "Unsupervised K-Means algorithms pattern recognition." },
          { name: "Neural Networks Overview", content: "Activation functions, deep layers, and backpropagation concepts." },
        ],
      }
    ]);

    console.log("Skills inserted");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });