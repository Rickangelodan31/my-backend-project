// middleware/auth.js
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

const authenticateTeacher = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = teacher;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { authenticateTeacher };
