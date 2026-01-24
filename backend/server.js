const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const skillRoutes = require("./routes/skill.routes");
const skillPathRoutes = require("./routes/skillPath.routes"); // Added this
const enrollmentRoutes = require("./routes/enrollment.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",                  // Allow your local testing
    "https://skillbridge-delta.vercel.app"    // Allow your Vercel Frontend
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/skill-paths", skillPathRoutes); // Added this
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SkillBridge backend is running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) =>
    console.error("MongoDB connection failed:", err.message)
  );

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});