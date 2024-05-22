const router = require("express").Router();
const { authenticateStudent } = require("../middleware/auth");
const Student = require("../models/Student");
const Course = require("../models/Course");

router.post("/enroll/:courseId", authenticateStudent, async (req, res) => {
  try {
    const student = req.user;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the student is already enrolled in the course
    if (student.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in the course" });
    }

    // Enroll student in the course
    student.enrolledCourses.push(courseId);
    await student.save();

    res
      .status(200)
      .json({ message: "Student enrolled in the course successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
