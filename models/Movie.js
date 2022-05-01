const mongoose = require("mongoose");

// the database schema

const MovieSchema = new mongoose.Schema({
  name: String,
  genre: String,
  release_date: Number,
  status: Boolean,
});

// export schema

module.exports = mongoose.model("Movie", MovieSchema);
