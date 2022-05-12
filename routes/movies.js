const express = require("express");
const app = require("../app");
const path = require("path");

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
  if (req.body.id == undefined || req.body.id == "" || req.body.id == "nah") {
    new_movie(req, res);
  } else {
    update_movie(req, res);
  }
});

// get request for "create new" button
router.get("/form/:username/", (req, res) => {
  // sends in username
  res.render("create_edit", {
    action: "New",
    username: req.params.username,
    id: "",
    name: "",
    genre: "",
    release_date: "",
    status: "",
  });
});

// get request for edit for edit button
router.post("/form/edit", async (req, res) => {
  let edit_instance = await Movie.find({ _id: req.body.id });
  // res.send(req.body.username);
  res.render("create_edit", {
    action: "Edit",
    username: req.body.username,
    name: req.body.name,
    genre: req.body.genre,
    status: req.body.status,
    release_date: req.body.release_date,
    id: req.body.id,
    movie: edit_instance,
  });
});

// update movie function, updates existing movie entry
async function update_movie(req, res) {
  let update_instance = await Movie.findOneAndUpdate(
    { _id: req.body.id },
    {
      username: req.body.username,
      name: req.body.name,
      genre: req.body.genre,
      release_date: req.body.release_date,
      status: req.body.status === "true",
    }
  );
  // let updated_movie = await Movie.findById({ _id: req.body._id });
  let movies = await Movie.find({ username: req.body.username });
  // res.json(movies);
  console.log(movies);
  res.render("view", { username: req.body.username, movies: movies });
}

// insert movie function, adds a new entry to the database
async function new_movie(req, res) {
  console.log(req.body, "New");
  let movie_entry = new Movie({
    username: req.body.username,
    name: req.body.name,
    genre: req.body.genre,
    release_date: req.body.release_date,
    status: req.body.status,
  });
  let send_entry = await movie_entry.save();
  // res.status(201).json(send_entry);
  let movies = await Movie.find({ username: req.body.username });
  res.render("view", { movies: movies, username: req.body.username });

  // {
  //   action: "Create",
  //   username: req.body.username,
  //   id: "",
  //   name: "",
  //   genre: "",
  //   release_date: "",
  //   status: "",
  // }
}

// delete by ID route
router.delete("/delete/:id", async (req, res) => {
  let deleted_movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  res.json(deleted_movie);
});

module.exports = router;
