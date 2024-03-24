const mongoose = require("mongoose");

// Define the MongoDb connection URL
const mongoURL = "YOUR_DB_CONNECTION_STRING";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDb connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error : ", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
