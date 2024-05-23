const router = require("express").Router();

router.get('/', (req, res) => {
    res.json('All good in here')
  })

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const coursesRoutes = require("./routes/courses.routes");
app.use("/course", coursesRoutes);

const studentRoutes = require("./routes/student.routes");
app.use("/student", studentRoutes);

const teacherRoutes = require("./routes/teacher.routes");
app.use("/teacher", teacherRoutes);

const techCourseRoutes = require("./routes/techCourse.routes");
app.use("/techCourse", techCourseRoutes);

const techCourses = require("./techCourses");
app.use("/techCourses", techCourseRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = router;
