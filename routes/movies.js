const express = require("express");
const app = require("../app");
// express router
const router = express.Router();
// the schema
const Movie = require("../models/Movie");

// to handle data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//
// app.get("/view")
