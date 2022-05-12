const express = require("express");
const app = require("../app");
// express router
const router = express.Router();

// the schema
const Movie = require("../models/Movie");

// handles the login,in the real app, this list of user will be from database
// function handleLogin() {
//   console.log("poggers");
//   // let entries = await Movie.find();
//   // return confirm("Hello");
//   let entries = [{ username: "Bobby222" }];
//   let users = [];
//   for (let i = 0; i < entries.length; i++) {
//     users.push(entries[i]["username"]);
//   }
//   let user_set = new Set(users);
//   let form = document.forms[0];
//   var formElement = form.querySelector('input[name="username"]');
//   if (formElement.value == "") {
//     return alert("Please provide a username!");
//   }
//   user_set.forEach((user) => {
//     if (formElement.value == user) {
//       return confirm(
//         `---${formElement.value}--- already exists, Do you wish to proceed?`
//       );
//     }
//   });
//   return confirm(
//     `---${formElement.value}--- Not found, an account will be made`
//   );
// }

// to handle data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// same as get request for view, shows table of data
router.post("/view", async (req, res) => {
  let user_movies = await Movie.find({ username: req.body.username });
  // res.json(user_movies);
  res.render("view", { username: req.body.username, movies: user_movies });
});

// post request to form, add data to database
router.post("/form", (req, res) => {
  if (req.body._id == undefined) {
    new_movie(req, res);
  } else {
    update_movie(req, res);
  }
});

// get request for "create new" button
router.get("/form/:username", (req, res) => {
  // sends in username
  res.send(`Create page ${req.params.username}`);
});

// get request for edit for edit button
router.get("/form/edit", (req, res) => {
  res.send("Edit page");
});

// update movie function, updates existing movie entry
async function update_movie(req, res) {
  console.log(req.body, "Update");
  await Movie.findOneAndUpdate(
    { _id: req.body._id },
    {
      username: req.body.username,
      name: req.body.name,
      genre: req.body.genre,
      release_date: req.body.release_date,
      status: req.body.status,
    }
  );
  // let updated_movie = await Movie.findById({ _id: req.body._id });
  let movies = await Movie.find({ username: req.body.username });
  res.json(movies);
}

// insert movie function, adds a new entry to the database
async function new_movie(req, res) {
  // console.log(req.body, "New");
  let movie_entry = new Movie(req.body);
  let send_entry = await movie_entry.save();
  // res.status(201).json(send_entry);
  let movies = await Movie.find({ username: req.body.username });
  res.json(movies);
}

// delete by ID route
router.delete("/delete/:id", async (req, res) => {
  let deleted_movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  res.json(deleted_movie);
});

module.exports = router;
