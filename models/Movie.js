const mongoose = require("mongoose");

// the database schema

const MovieSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  genre: {
    required: true,
    type: String,
  },
  release_date: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: Boolean,
  },
});

// export schema

module.exports = mongoose.model("Movie", MovieSchema);
