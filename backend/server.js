require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const skillRoutes = require("./routes/skill.routes");
const skillPathRoutes = require("./routes/skillPath.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/skill-paths", skillPathRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("Mongo Error ❌:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});