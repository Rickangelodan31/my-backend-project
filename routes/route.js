const router = require('express').Router();
const { authenticateTeacher } = require('../middleware/auth');

// Only teachers can access this route
router.post('/block-student/:studentId', authenticateTeacher, async (req, res) => {
  // Block student logic
});

module.exports = router;


