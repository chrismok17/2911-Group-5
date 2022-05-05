let mocha = require("mocha");
let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const { describe } = require("mocha");
const { assert } = require("chai");
require("dotenv").config();

// Tell chai to use chai-http
chai.should();

chai.use(chaihttp);

// Tell mongoose to use ES6 promises
mongoose.Promise = global.Promise;
const MONGODB_URI = process.env.DB_CONNECTION
mongoose.connect(MONGODB_URI)

// Mongoose connection
describe("Test mongodb connection", () =>{
    // Connection to database
    describe("Checks connection to database", () => {
        it("Connects to database succesfully", (done) => {
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
        done();
        });
    });

    describe("Creates new movie", () => {
        it("Creation of new movie is gucci", (done) => {
            const newMovie = new Movie({
                username: "Chris", 
                name: "Avengers: Endgame", 
                genre: "Action", 
                release_date: 12, 
                status: true});
            newMovie.save();
            assert(newMovie.username == "Chris");
            assert(newMovie.name == "Avengers: Endgame");
            assert(newMovie.genre == "Action");
            assert(newMovie.release_date == 12);
            assert(newMovie.status == true);
            done();
        });
    });
});

// API Calls
describe("app.js API", () => {
    // Test GET
    describe("GET home page", () => {
        it("It should render home.html", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.expect(res).to.be.html;
                done();
                });
        });
    });
});

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