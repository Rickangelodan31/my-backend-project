const router = require("express").Router();
const Student = require("../Models/Student.model");
const uploader = require("../middlewares/cloudinary.config");
const { isAuthenticated } = require("../middlewares/route-gaurd.middleware");
const Course = require("./courses.routes");
// const Designer = require("../models/Designer.model");

// All routes start with /api/student

// Need the middleware cloudinary
router.post(
  "/enroll/:courseId",
  isAuthenticated,
  uploader.single("image"),
  async (req, res) => {
    try {
      console.log(req.file);
      const student = await Student.create({
        ...req.body,
        vendor: req.tokenPayload.studentId,
        image: req.file.path,
      });
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        nextSteps:
          "Ensure all required fields are filled correctly and try again. If the problem persists, contact support.",
      });
    }
  }
);
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).populate('enrolledCourses').select('-hashedPassword');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const student = await Student.findOne({
      select: req.tokenPayload.studentId,
    }).populate({
      path: "student",
      select: "-hashedPassword",
    }); // Make sure to strip away the password
    if (!student) {
      res.status(404).json({
        message: "Student not found",
        nextSteps:
          "Please check your user ID and try again. If the problem persists, contact support.",
      });
      return;
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      nextSteps:
        "Please try again later. If the problem persists, contact support.",
    });
  }
});

router.put("/", isAuthenticated, async (req, res) => {
  console.log(req.body);
  try {
    const student = await Student.findByIdAndUpdate(
      req.tokenPayload.studentId,
      req.body,

      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) {
      res.status(404).json({
        message: "Student not found",
        nextSteps:
          "Please check your user ID and try again. If the problem persists, contact support.",
      });
      return;
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      nextSteps:
        "Please ensure all fields are valid and try again. If the problem persists, contact support.",
    });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({
        message: "Student not found",
        nextSteps:
          "Please check the student ID and try again. If the problem persists, contact support.",
      });
      return;
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      nextSteps:
        "Please try again later. If the problem persists, contact support.",
    });
  }
});

module.exports = router;
