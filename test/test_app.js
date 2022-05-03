
let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../app");

chai.should();

chai.use(chaihttp);

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