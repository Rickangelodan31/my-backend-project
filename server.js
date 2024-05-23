const express = require('express');
const withDB = require('./db');
const techCourses = require('./techCourses');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());

// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Tech Courses API</h1>');
});

// Route to fetch all tech courses
app.get('/api/techCourses', (_, res) => {
  res.json(techCourses);
});

// Connect to the database and start listening for requests
withDB(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

