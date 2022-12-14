const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const PATH = "/transactions";
const { encode } = require("../helpers/jwt.helper");
const { expect } = require("chai");
require("dotenv").config();

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Test Transactions", () => {
  const token = encode(
    {
      id: 7,
      roleId: 2,
      email: "apu@mail.com",
      password: "Hola1234",
    },
    "10m"
  );
  describe(`GET ${PATH}`, () => {
    it("respond with a list of all transactions", (done) => {
      chai
        .request(app)
        .get(`${PATH}`)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });

  describe(`GET ${PATH}/:id`, () => {
    it("respond with a single Transaction", (done) => {
      chai
        .request(app)
        .get(`${PATH}/1`)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });

  it("respond error 404 if couldn't find a Transaction by id", (done) => {
    chai
      .request(app)
      .get(`${PATH}/100`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  describe(`POST ${PATH}`, () => {
    it("respond whit 200 Transaction created successfully", (done) => {
      const data = {
        amount: 100.1,
        description: "test",
        userId: 1,
        categoryId: 1,
        toUserId: 1,
      };
      chai
        .request(app)
        .post(`${PATH}`)
        .set("authorization", `Bearer ${token}`)
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

  describe(`PUT ${PATH}/:id`, () => {
    it("respond whit 200 Transaction created successfully", (done) => {
      const data = {
        description: "testing transaction",
      };
      chai;
      request(app)
        .put(`${PATH}/1`)
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(data)
        .end((err, response) => {
          response.should.have.status(202);
          response.should.have.header("content-type", /json/);
          done();
        });
    });

    it("respond error code 404 Couldn't find a Transaction", (done) => {
      chai
        .request(app)
        .get(`${PATH}/00`)
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
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

  describe(`DELETE ${PATH}/:id`, () => {
    it("should delete transaction by id", (done) => {
      chai
        .request(app)
        .delete(`${PATH}/1`)
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
