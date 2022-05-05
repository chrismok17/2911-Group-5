const express = require("express");
const app = require("../app");
// express router
const router = express.Router();
// the schema
const Movie = require("../models/Movie");

// to handle data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/view", (req, res) => {
  res.send(`<h1>Your Username is :  ${req.body.username}</h1>`);
});

module.exports = router;
