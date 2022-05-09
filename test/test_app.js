let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");
const { describe } = require("mocha");

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
                .get("/tracker/edit") // Change this later (?)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.expect(res).to.be.html;
                });
        });
    });
});