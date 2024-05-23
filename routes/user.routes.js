const express = require("express");
const router = express.Router();
const User = require("../Models/User.model");
const { isAuthenticated } = require("../middlewares/route-gaurd.middleware");

router.post("/signup", async (req, res) => {
  try {
    const { username, firstName, lastName, dateOfBirth, password } = req.body;

    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 13);

    // Create a new user
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
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in req.user by the auth middleware
    const user = await User.findById(userId).select('-hashedPassword'); // Exclude the password hash
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Get all users
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find({}, { hashedPassword: 0 }); // Exclude the password hash
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific user by ID
router.get("/:userId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { hashedPassword: 0 }); // Exclude the password hash
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a user's information
router.put("/:userId", isAuthenticated, async (req, res) => {
  const { firstName, lastName, dateOfBirth, username, program } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { firstName, lastName, dateOfBirth, username, program },
      { new: true, fields: { hashedPassword: 0 } } // Exclude the password hash
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a user
router.delete("/:userId", isAuthenticated, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
