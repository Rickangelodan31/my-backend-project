const router = require("express").Router();
const Teacher = require("../Models/Teacher.model");
const Student = require('../Models/Student.model');
const uploader = require("../middlewares/cloudinary.config");
const { isAuthenticated } = require("../middlewares/route-gaurd.middleware");

// All routes start with /api/teacher

router.post(
  "/grade/:studentId/:courseId",
  isAuthenticated,
  uploader.single("image"),
  async (req, res) => {
    try {
        const { studentId, courseId } = req.params;
        const { grade } = req.body;
  
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
  
        // Check if the student is enrolled in the course
        if (!student.enrolledCourses.includes(courseId)) {
          return res.status(400).json({ message: 'Student is not enrolled in the course' });
        }
  
        // Update the student's grade
        const existingGradeIndex = student.grades.findIndex(g => g.course.equals(courseId));
        if (existingGradeIndex !== -1) {
          // Update existing grade
          student.grades[existingGradeIndex].grade = grade;
        } else {
          // Add new grade
          student.grades.push({ course: courseId, grade });
        }
  
        await student.save();
  
        res.status(200).json({ message: 'Grade updated successfully' });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        nextSteps: "Ensure all required fields are filled correctly and try again. If the problem persists, contact support.",
      });
    }
  }
);

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.tokenPayload.userId).select("-password");
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        nextSteps: "Please check your user ID and try again. If the problem persists, contact support.",
      });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      nextSteps: "Please try again later. If the problem persists, contact support.",
    });
  }
});

router.put("/", isAuthenticated, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.tokenPayload.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        nextSteps: "Please check your user ID and try again. If the problem persists, contact support.",
      });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      nextSteps: "Please ensure all fields are valid and try again. If the problem persists, contact support.",
    });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        nextSteps: "Please check the teacher ID and try again. If the problem persists, contact support.",
      });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      nextSteps: "Please try again later. If the problem persists, contact support.",
    });
  }
});

module.exports = router;
