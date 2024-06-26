const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  hashedPassword: {
    type: String,
  },
  userType: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
