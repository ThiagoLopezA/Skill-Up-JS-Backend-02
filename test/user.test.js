const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { encode } = require("../helpers/jwt.helper");
require("dotenv").config();

//Assertion Style
chai.should();
chai.use(chaiHttp);

/**
 * Testing the GET (by id) route
 */

describe("Test for users", () => {
  const token = encode(
    {
      id: 1,
      roleId: 1,
      email: "marge@mail.com",
      password: "Hola1234",
    },
    "10m"
  );
  describe("GET /users/:id", () => {
    it("respond with json containing a user", (done) => {
      const userId = 1;
      chai
        .request(app)
        .get(`/users/${userId}`)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.header("content-type", /json/);
          done();
        });
    });

    it("respond with HTML Error `User not found` when the user does not exist", (done) => {
      chai
        .request(app)
        .get("/users/" + 101)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.should.have.header(
            "content-type",
            "text/html; charset=utf-8"
          );
          done();
        });
    });
  });

  /**
   * Testing the POST user route
   */
  describe("POST /users/register", () => {
    it("respond with `User created successfully`", (done) => {
      const data = {
        firstName: "Edna",
        lastName: "Krabappel",
        email: "edna@mail.com",
        avatar: "edna.jpeg",
        password: "Hola1234",
        roleId: 1,
      };
      chai
        .request(app)
        .post("/users/register")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(data)
        .end((err, response) => {
          response.should.have.status(201);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });

  /**
   * Testing the POST auth route
   */

  describe("POST /auth", () => {
    it("respond with `Authenticated successfully`", (done) => {
      const data = {
        email: "marge@mail.com",
        password: "Hola1234",
      };
      chai
        .request(app)
        .post("/auth/login")
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
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

  describe("PUT /users/:id", () => {
    it("respond with `User update successfully`", (done) => {
      const userId = 1;
      const data = {
        firstName: "Marjorie",
      };
      chai
        .request(app)
        .put(`/users/${userId}`)
        .set("authorization", `Bearer ${token}`)
        .send(data)
        .end((err, response) => {
          response.should.have.status(202);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });

  /**
   * Testing the DELETE route
   */

  describe("DELETE /users/:id", () => {
    it("respond with `User deleted successfully`", (done) => {
      const userId = 2;
      const token = encode(
        {
          id: 2,
          roleId: 1,
          email: "lisa@mail.com",
          password: "Hola1234",
        },
        "10m"
      );
      chai
        .request(app)
        .delete("/users/" + userId)
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, response) => {
          response.should.have.status(202);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });
});
