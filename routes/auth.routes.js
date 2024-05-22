const User = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-gaurd.middleware");

// Health check endpoint
router.get("/", (req, res) => {
  res.json("All good in auth");
});

// Student signup
router.post("/student/signup", async (req, res) => {
  const { username, firstName, lastName, dateOfBirth, program, password } = req.body;
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(401).json("Username already exists");
    }
    const newUser = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      username,
      program,
      usertype: "student",
      hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Teacher signup
router.post("/teacher/signup", async (req, res) => {
  const { username, firstName, lastName, dateOfBirth, password } = req.body;
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(401).json("Username already exists");
    }
    const newUser = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      username,
      usertype: "teacher",
      hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Common login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const potentialUser = await User.findOne({ username });

    if (!potentialUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, potentialUser.hashedPassword)) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const authToken = jwt.sign(
      { userId: potentialUser._id, userType: potentialUser.usertype },
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "6h" }
    );

    res.status(200).json({ message: "Password Accepted", token: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is a problem" });
  }
});

// Example to get back current user
router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const userId = req.tokenPayload.userId;
    const currentUser = await User.findById(userId, { hashedPassword: 0 });
    res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching current user" });
  }
});

module.exports = router;
