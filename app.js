const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
require("dotenv").config();

// to handle data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell app to use /public for all assets including css and images
app.use(express.static(__dirname + "/public"));

// use ejs
app.set("view engine", "ejs");

// Default route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Tell app to listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to Mongo
// mongoose.connect(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// use router for all routes that start with "tracker"
MovieRouter = require("./routes/movies");
app.use("/tracker", MovieRouter);

// For Testing
module.exports = app;
