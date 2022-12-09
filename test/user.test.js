const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = require("chai");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("GET /users/:id", () => {
  /**
   * Testing the GET (by id) route
   */
  it("respond with json containing a user", (done) => {
    const userId = 1;
    chai
      .request(app)
      .get("/users/" + userId)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("respond with HTML Error `User not found` when the user does not exist", (done) => {
    chai
      .request(app)
      .get("/users/" + 101)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.have.header("content-type", "text/html; charset=utf-8");
        done();
      });
  });
});

/**
 * Testing the POST user route
 */
describe("POST /users", (done) => {
  it("respond with `User created successfully`", (done) => {
    const data = {
      first_name: "Edna",
      last_name: "Krabappel",
      email: "edna@mail.com",
      password: "Hola1234",
    };
    chai
      .request(app)
      .post("/users")
      .send(data)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header("content-type", /json/);
        done();
      });
  });
});

/**
 * Testing the POST auth route
 */

describe("POST /auth", (done) => {
  it("respond with `Authenticated successfully`", (done) => {
    const data = {
      email: "edna@mail.com",
      password: "Hola1234",
    };
    chai
      .request(app)
      .post("/auth/login")
      .send(data)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header("content-type", /json/);
        done();
      });
  });
});

/**
 * Testing the PUT route
 */

describe("PUT /users/:id", (done) => {
  it("respond with `User update successfully`", (done) => {
    const userId = 1;
    const data = {
      first_name: "Marjorie",
    };
    chai
      .request(app)
      .put("/users/" + userId)
      .send(data)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header("content-type", /json/);
        done();
      });
  });
});

/**
 * Testing the DELETE route
 */

describe("DELETE /users/:id", (done) => {
  it("respond with `User deleted successfully`", (done) => {
    const userId = 2;
    chai
      .request(app)
      .delete("/users/" + userId)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header("content-type", /json/);
        done();
      });
  });
});
