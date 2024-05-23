const express = require('express');
const router = express.Router();
const TechCourse = require('../models/TechCourse');

// Route to fetch all tech courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await TechCourse.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a new tech course
router.post('/courses', async (req, res) => {
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
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update an existing tech course
router.put('/courses/:id', async (req, res) => {
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
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a tech course
router.delete('/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    await TechCourse.findByIdAndDelete(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
