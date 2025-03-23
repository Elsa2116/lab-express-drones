// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-express-drones';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Rootlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const droneRoutes = require('./routes/drones')
app.use('/', droneRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;





const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const methodOverride = require("method-override");

const app = express();

// Database Connection
mongoose.connect("mongodb://localhost:27017/dronesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Routes
const droneRoutes = require("./routes/drones");
app.use("/drones", droneRoutes);

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

