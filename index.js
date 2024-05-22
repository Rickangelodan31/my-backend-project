const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const teacherRoutes = require("./routes/teacher.routes");
router.use("/api/teacher", teacherRoutes);

const studentRoutes = require("./routes/students.routes");
router.use("/student", studentRoutes);

const userRoutes = require("./routes/user.routes");
router.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}),
  (module.exports = router);
