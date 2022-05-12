let mocha = require("mocha");
let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const { describe } = require("mocha");
const { assert } = require("chai");
require("dotenv").config();

// Tell Chai to use chai-http
chai.should();

chai.use(chaihttp);

// Tell mongoose to use ES6 promises
mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.DB_CONNECTION
mongoose.connect(MONGODB_URI)

describe("Testing Mongo connections", () => {
    //Testing unsuccessful Mongo entry creation
    describe("Bad entry", () => {
        it("This entry is bad but we caught the error", () => {
            function bad_entry() {
                const badMovie = new Movie({
                username: 55,
                name: 45, 
                genre: 33, 
                release_date: "bruh", 
                status: "kekw"});
                
                const good_entry = {
                    username : String,
                    name : String,
                    genre : String,
                    release_date: Number,
                    status: Boolean
                }

                for(let i in badMovie) {
                    if(typeof(badMovie[i]) == typeof(good_entry[i])) {
                        continue
                    }
                    else {
                        throw new Error("Bad entry")
                        }
                    };
                };
                chai.assert.throws(bad_entry, "Bad entry");
            });
        });
    //test interaction of entry with database
    describe("Interacting with the databse", () => {
        it("Connects to database and interact with entries", (done) => {
            mongoose.connection
                .once("open", () => console.log("Connected"))
                .on("error", (err) => {
                    console.warn("Error: ", err)
                });

                beforeEach((done) => {
                    mongoose.connection.collections.movies.drop(() => {
                        done();
                    });
                });

                function create_entry() {
                    beforeEach((done) => {
                        let newEntry = new Movie({
                            username : "Tamim",
                            name : "Avengers",
                            genre : "action",
                            release_date: 12,
                            status: true
                        });
                        newEntry.save()
                        .then(() => done());
                    });
                };

                create_entry()

                it("Remove a movie using it's instance", (done) => {
                    Movie.remove()
                    .then(() => Movie.findOne({ username : "Tamim" }))
                    .then((movie) => {
                        assert(movie == null);
                        done();
                    });
                });

                create_entry()

                it("Update a movie", (done) => {
                    updateData = new Movie({
                        username : "Tamim",
                        name : "Fast and Furious",
                        genre : "action",
                        release_date: 15,
                        status: false
                    });

                    for(let i in updateData) {
                        newEntry[i] = updateData[i];
                    }

                    Movie.findOne({ username : "Tamim" })
                    .then((movie) => {
                        assert(movie.username == "Tamim")
                        assert(movie.name == "Fast and Furious")
                        assert(movie.genre == "action")
                        assert(movie.release_date == 15)
                        assert(movie.status == false)
                        done();
                    })
                })

                it("Check that a movie is saved to DB and one that is not", (done) => {
                    Movie.findOne({ release_date : 12 })
                    .then((movie) => {
                        assert(movie != null)
                    })

                    notSavedMovie = new Movie ({
                        username : "Tamim",
                        name : "J.I. Goe",
                        genre : "action",
                        release_date : 20,
                        status : true
                    });

                    Movie.findOne({ name : "J.I. Goe" })
                    .then((movie) => {
                        assert(movie == null)
                        done();
                    })
                })
            //     mongoose.connection.collections.movies.drop(() => {
            //     done();
            // });
        });
    });
})



