// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
// const clientPromise = require("./db");

const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("./db/index");

const mongoUrl = mongoose.connections[0]._connectionString;

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 10060000,
    },
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      dbName: "prod",
      stringify: true,
      autoRemove: "interval",
      autoRemoveInterval: 1,
    }),
  })
);

// To allow our app to use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// Passport initial setup
require("./config/passport");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const projectRoutes = require("./routes/project.routes");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

const authRouter = require("./routes/auth.routes"); // <== has to be added
app.use("/api/auth", authRouter); // <== has to be added

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
