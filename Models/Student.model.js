const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  grades: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F"], // Assuming grading system (A-F)
    },
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
