const express = require("express");
const app = require("../app");
// express router
const router = express.Router();

// the schema
const Movie = require("../models/Movie");

// handles the login,in the real app, this list of user will be from database
function handleLogin() {
  let tempusers = ["tim", "johnny"];
  let form = document.forms[0];
  var formElement = form.querySelector('input[name="username"]');
  for (let i = 0; i < tempusers.length; i++) {
    if (formElement.value == tempusers[i]) {
      return confirm(
        `---${formElement.value}--- already exists, Do you wish to proceed?`
      );
    }
  }
  return confirm(
    `---${formElement.value}--- Not found, an account will be made`
  );
}

// to handle data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// same as get request for view, shows table of data
router.post("/view", (req, res) => {
  let info = {
    johnny: "Johnny's Credit Card Number: 7772 3234 6746 2124",
    tim: "Tims dark secret: I like dipping my chocolate in MAYO ",
  };
  res.send(
    `<h1>Your Username is :  ${req.body.username} || ${
      info[req.body.username]
    }</h1>`
  );
});

// post request to form, add data to database
router.post("/form", (req, res) => {
  if (req.body._id == "") {
    new_movie(req, res);
  } else {
    update_movie(req, res);
  }
});

// update movie function, updates existing movie entry
function update_movie(req, res) {
  console.log(req.body, "Update");
  Movie.findOneAndUpdate(
    { _id: req.body.id },
    {
      username: req.body.username,
      name: req.body.name,
      genre: req.body.genre,
      release_date: req.body.release_date,
      status: req.body.status,
    }
  );
}

// insert movie function, adds a new entry to the database
function new_movie(req, res) {
  console.log(req.body, "New");
}

module.exports = router;
