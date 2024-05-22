// models/Teacher.model.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },

  hashedPassword: {
    type: String,
    required: true
  },
  // Add other fields relevant to the teacher

  // Array of courses taught by the teacher
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
