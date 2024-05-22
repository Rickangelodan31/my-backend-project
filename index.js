const express = require("express");
const router = express.Router();

// Import route files
const authRoutes = require("./auth.routes");
const coursesRoutes = require("./courses.routes");
const studentRoutes = require("./student.routes");
const teacherRoutes = require("./teacher.routes");
const userRoutes = require("./user.routes")

// Use routes under specific paths
router.use("/auth", authRoutes);
router.use("/course", coursesRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);
router.use("/user", userRoutes);

// Test route to ensure the main router is working
router.get("/", (req, res) => {
  res.json("API is working");
});

module.exports = router;
