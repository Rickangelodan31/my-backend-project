const router = require("express").Router();

const courseRoutes = require("./courses.routes");
router.use("/courses", courseRoutes);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const studentRoutes = require("./students.routes");
router.use("/students", studentRoutes);

const teacherRoutes = require("./teacher.routes");
router.use("/teachers", teacherRoutes);

module.exports = router;
