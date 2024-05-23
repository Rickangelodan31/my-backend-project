const express = require("express");
const router = express.Router();
const techCourses = require("../techCourses");

// Route to fetch all tech courses
router.get("/", async (req, res) => {
  try {
    const courses = await TechCourse.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get('/:techCourseId', async (req, res) => {
  try {
    const courses = await Course.findById(req.params.techCourseId)
    res.status(200).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Route to create a new tech course
router.post("/", async (req, res) => {
  try {
    const { name, description, duration, modules, diploma } = req.body;
    const newCourse = await TechCourse.create({
      name,
      description,
      duration,
      modules,
      diploma,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update an existing tech course
router.put("/:techCourseId", async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, description, duration, modules, diploma } = req.body;
    const updatedCourse = await TechCourse.findByIdAndUpdate(
      courseId,
      {
        name,
        description,
        duration,
        modules,
        diploma,
      },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete a tech course
router.delete("/techCourses:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    await TechCourse.findByIdAndDelete(courseId);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
