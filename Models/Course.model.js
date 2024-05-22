// models/Course.model.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // or you can use Date type if you want to store the duration in a specific format
    required: true,
  },
  modules: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  }],
  diploma: {
    name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  },
  // Add more fields as needed
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
