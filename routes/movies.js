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

module.exports = router;
