const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const teacherRoutes = require("./teacher.routes");
router.use("/teacher", teacherRoutes);

const studentRoutes = require("./student.routes");
router.use("/student", studentRoutes);

const userRoutes = require("./user.routes");
router.use("/users", userRoutes);

module.exports = router;
