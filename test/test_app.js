let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");
const { describe } = require("mocha");
const Movie = require("../models/Movie");
const { response } = require("../app");

// Tell chai to use chai-http
chai.should();

chai.use(chaihttp);

// API Calls
describe("app.js API", () => {
    // Test GET home
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

    // Test GET view
    describe("GET view page", () => {
        it("It should render view.html", (done) => {
            chai.request(server)
                .get("/tracker/view")
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.expect(res).to.be.html;
                done();
                });
        });
    });

    // Test GET create/edit
    describe("GET create/edit page", () => {
        it("It should render the edit_create.html page", (done) => {
            chai.request(server)
                .get("/tracker/form") 
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.expect(res).to.be.html;
                done();
                });
        });
    });

    // Test POST
    describe("POST new movie entry", () => {
        it("It should create a new movie entry", (done) => {
            let movie = new Movie ({
                username: "Chris",
                name: "Doctor Strange in the Multiverse of Madness",
                genre: "horror",
                release_date: 05,
                status: true
            })
            movie.save();
            chai.request(server)
                .post("/tracker/form")
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    response.body.should.have.property("name").eq("Chris");
                    response.body.should.have.property("username").eq("Doctor Strange in the Multiverse of Madness");
                    response.body.should.have.property("genre").eq("horror");
                    response.body.should.have.property("release_date").eq(05);
                    response.body.should.have.property("status").eq(true);
                movie.remove();
                done();
                });
        });
    });
});