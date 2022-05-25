const express = require("express");
const app = require("../app");
const path = require("path");
const fetch = require("node-fetch");

// express router
const router = express.Router();

// the schema
const Movie = require("../models/Movie");
const { response } = require("../app");
const res = require("express/lib/response");

// =========================================================
// here lies the space that the login function used to live
//                  REST IN PEACE
// =========================================================

// to parse data from reqs
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// renders the view ejs page
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
    action: "New Movie",
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
    action: "Edit Movie",
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
  res.render("view", { username: req.body.username, movies: movies });
}

// insert movie function, adds a new entry to the database
async function new_movie(req, res) {
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
}

// fetches data from an external API to get movie info
async function movie_info(formatted_name, year) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=8f5f081b&t=${formatted_name}&y=${year}&plot=full`
  );

  return response.json();
}

// delete by ID route
router.post("/delete/:id", async (req, res) => {
  let deleted_movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  let movies = await Movie.find({ username: req.body.username });
  res.render("view", { movies: movies, username: req.body.username });
});

// serve the page with movie data, uses third party movie API
router.post("/info", async (req, res) => {
  let movie_name = req.body.name;
  let formatted_name = movie_name.replace(/ /g, "+");
  let username = req.body.username;
  let movie_year = req.body.year;

  // movie info page, renders the movie_info ejs page with the data received from API func
  res.render("movie_info", {
    data: await movie_info(formatted_name, movie_year),
    username: username,
  });
});

// export the router to be used in app.js

module.exports = router;
