const router = require('express').Router();
const { authenticateTeacher } = require('../middleware/auth');
const Student = require('../models/Student');
const Course = require('../models/Course');

router.post('/grade/:studentId/:courseId', authenticateTeacher, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const grade = req.body.grade;

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
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
