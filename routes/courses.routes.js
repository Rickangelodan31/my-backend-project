const router = require("express").Router();
const { authenticateStudent } = require("../middleware/auth");
const Course = require("../models/Course");

router.post("/enroll/:courseId", authenticateStudent, async (req, res) => {
  // Implementation remains the same
});

module.exports = router;
