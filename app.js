const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Tell the app to use /CSS directory for CSS files
app.use("/CSS", express.static(path.join(__dirname, "CSS")));

// Tell app to use /Assets for logo files
app.use("/Assets", express.static(path.join(__dirname, "Assets")));

// Default route for home page
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Connect to mongoDB
mongoose.connect(
  "mongodb+srv://Filet-admin:pizza567@cluster0.kcpfg.mongodb.net/courses"
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to Database");
});

// Tell app to listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
