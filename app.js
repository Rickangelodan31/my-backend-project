// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

require("dotenv").config();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const courseRoutes = require("./routes/courses.routes");
app.use("/course", courseRoutes);

const studentRoutes = require("./routes/students.routes");
app.use("/student", studentRoutes);

const teacherRoutes = require("./routes/teachers.routes");
app.use("/teacher", teacherRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;