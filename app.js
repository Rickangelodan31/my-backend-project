// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

require("dotenv").config();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


module.exports = app;
