let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");
const { describe } = require("mocha");
const Movie = require("../models/Movie");

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

    // TEST DRIVEN DEVELOPMENT TESTS //
    
    let movie = new Movie ({
        username: "Chris",
        name: "Doctor Strange in the Multiverse of Madness",
        genre: "horror",
        release_date: 05,
        status: true
    })
    movie.save()
    // Test POST
    describe("POST new movie entry", () => {
        it("It should create a new movie entry", (done) => {
            chai.request(server)
                .post("/tracker/form")
                .send(movie)
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.be.a("object");
                    // res.body.should.have.property("_id").eq(movie._id)
                    res.body.should.have.property("username").eq("Chris");
                    res.body.should.have.property("name").eq("Doctor Strange in the Multiverse of Madness");
                    res.body.should.have.property("genre").eq("horror");
                    res.body.should.have.property("release_date").eq(05);
                    res.body.should.have.property("status").eq(true);
                })
            done();
        });
    });

    describe("Update movie entry with POST",  () => {
        it("It should update a movie entry", async () => {
            let updated_movie = await Movie.findOneAndUpdate({ _id: movie._id},
            {
                username: movie.username,
                name: "Thor 4 More Thor",
                genre: "comedy",
                release_date: movie.release_date,
                status: false}, {returnOriginal: false})
            console.log(updated_movie)
            chai.request(server)
                .post("/tracker/form/" )
                .send(updated_movie)
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    res.body.should.be.a("object");
                    // res.body.should.have.property("_id").eq(updated_movie._id);
                    res.body.should.have.property("username").eq("Chris");
                    res.body.should.have.property("name").eq("Thor 4 More Thor");
                    res.body.should.have.property("genre").eq("comedy");
                    res.body.should.have.property("release_date").eq(05);
                    res.body.should.have.property("status").eq(false);
                
                });
        });
    });

    // TEST DELETE
    describe("Delete a movie entry", () => {
        it("Should succesfully delete a movie entry", (done) => {
            chai.request(server)
             .delete("/tracker/delete/:id")
             .end((err, res) => {
                res.status.should.be.equal(200)
            
            })
        done();
        })
    })
})