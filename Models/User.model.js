const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'teacher'], // Assuming there are only two types of users: student and teacher
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

