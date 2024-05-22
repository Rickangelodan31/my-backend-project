const jwt = require("jsonwebtoken");
const Student = require('../Models/Student.model');
const Teacher = require('../Models/Teacher.model');


const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, userType } = decoded;
    let user;

    if (userType === "student") {
      user = await Student.findById(userId);
    } else if (userType === "teacher") {
      user = await Teacher.findById(userId);
    } else {
      return res.status(401).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.tokenPayload = decoded;
    req.user = user; // Attach user object to request for further use
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {isAuthenticated};
