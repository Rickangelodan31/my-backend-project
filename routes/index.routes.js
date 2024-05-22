const router = require("express").Router();

const coursesRoutes = require("./courses.routes");
router.use("/courses", coursesRoutes);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const studentRoutes = require("./student.routes");
router.use("/student", studentRoutes);

const teacherRoutes = require("./teacher.routes");
router.use("/teacher", teacherRoutes);

module.exports = router;
