const mongoose = require("mongoose");

// the database schema

const MovieSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  release_date: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

// export schema

module.exports = mongoose.model("Movie", MovieSchema);
