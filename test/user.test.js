const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = require("chai");
const { encode, decode } = require("../helpers/jwt.helper");
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
      email: "marge@mail.com",
      password: "Hola1234",
    },
    10
  );

  describe("GET /users/:id", () => {
    it("respond with json containing a user", (done) => {
      const userId = 1;
      chai
        .request(app)
        .get(`/users/${userId}`)
        .auth(token, { type: "bearer" })
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
        .auth(token, { type: "bearer" })
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
        password: "Hola1234",
        avatar: "edna.jpeg",
        rolId: 1,
      };
      chai
        .request(app)
        .post("/users/register")
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
      // const token = encode(
      //   {
      //     email: data.email,
      //     password: data.password,
      //   },
      //   10
      // );
      chai
        .request(app)
        .post("/auth/login")
        .auth(token, { type: "bearer" })
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
      const token = encode(
        {
          email: "marge@mail.com",
          password: "Hola1234",
        },
        10
      );
      chai
        .request(app)
        .put(`/users/${userId}`)
        .auth(token, { type: "bearer" })
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
          email: "apu@mail.com",
          password: "Hola1234",
        },
        10
      );
      chai
        .request(app)
        .delete("/users/" + userId)
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(202);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });
});
