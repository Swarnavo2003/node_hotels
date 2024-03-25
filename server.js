const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Welcome to my hotel");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Use the routers
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
