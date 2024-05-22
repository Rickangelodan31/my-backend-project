const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-gaurd.middleware");
const Course = require("../Models/Course.model");
const Student = require("../Models/Student.model");

// Create an enrollment
router.post("/enroll/:courseId", isAuthenticated, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.tokenPayload.userId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the student is already enrolled in the course
    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );
    if (
      student.enrolledCourses.some(
        (course) => course._id.toString() === courseId
      )
    ) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in the course" });
    }

    // Enroll the student in the course
    student.enrolledCourses.push(courseId);
    await student.save();

    res
      .status(200)
      .json({ message: "Student enrolled successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all enrollments
router.get("/enroll", isAuthenticated, async (req, res) => {
  try {
    const studentId = req.tokenPayload.userId;
    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );
    res.status(200).json({ enrolledCourses: student.enrolledCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an enrollment
router.put("/enroll/:courseId", isAuthenticated, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.tokenPayload.userId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the student is enrolled in the course
    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );
    if (
      !student.enrolledCourses.some(
        (course) => course._id.toString() === courseId
      )
    ) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in the course" });
    }

    // Update the enrollment (if needed)

    res
      .status(200)
      .json({ message: "Enrollment updated successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an enrollment
router.delete("/enroll/:courseId", isAuthenticated, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.tokenPayload.userId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the student is enrolled in the course
    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );
    if (
      !student.enrolledCourses.some(
        (course) => course._id.toString() === courseId
      )
    ) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in the course" });
    }

    // Remove the course from the student's enrolledCourses array
    const index = student.enrolledCourses.findIndex(
      (course) => course._id.toString() === courseId
    );
    student.enrolledCourses.splice(index, 1);
    await student.save();

    res
      .status(200)
      .json({ message: "Enrollment deleted successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
