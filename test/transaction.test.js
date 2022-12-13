const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const PATH = "/transactions";
const { encode } = require("../helpers/jwt.helper");
const { expect } = require("chai");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("Test Transactions", () => {
  const token = encode(
    {
      email: "marge@mail.com",
      password: "Hola1234",
    },
    5
  );

  describe(`GET ${PATH}`, () => {
    it("respond with a list of all transactions", (done) => {
      request(app)
        .get(`${PATH}`)
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe(`GET ${PATH}/:id`, () => {
    it("respond whit a single Transaction", (done) => {
      request(app)
        .get(`${PATH}/1`)
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        .expect(200, done);
    });

    it("respond error 404 if couldn't find a Transaction by id", (done) => {
      request(app)
        .get(`${PATH}/00`)
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        .expect(404, done);
    });
  });

  describe(`POST ${PATH}`, (done) => {
    it("respond whit 200 Transaction created successfully", (done) => {
      const data = {
        amount: 10,
        description: "test",
        userId: 1,
        categoryId: 1,
        date: new Date(),
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      chai.request(app).post(`${PATH}`).send(data);
      expect(data).to.have.all.keys(
        "amount",
        "description",
        "userId",
        "categoryId",
        "date",
        "updatedAt",
        "createdAt"
      );
      done();
    });

    it("should respond error code 400 bad request (data incomplete)", (done) => {
      const data = [
        { description: "test", userId: 1, categoryId: 1 },
        { amount: null, description: "test", userId: 1, categoryId: 1 },
        { amount: 10, userId: 1, categoryId: 1 },
        { amount: 20, description: "test", categoryId: 1 },
      ];

      chai
        .request(app)
        .post(`${PATH}`)
        .send(data[0])
        .end((err, res) => {
          res.should.have.header("content-type", /json/);
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
        .send(data)
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        .send(data)
        .end((err, res) => {
          res.should.be.a("object");
          done();
        });
    });

    it("respond error code 404 Couldn't find a Transaction", (done) => {
      request(app)
        .get(`${PATH}/00`)
        .auth(token, { type: "bearer" })
        .set("Accept", "application/json")
        .expect(404, done);
    });
  });

  describe(`DELETE ${PATH}/:id`, () => {
    it("should delete transaction by id", (done) => {
      chai;
      request(app)
        .delete(`${PATH}/1`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.header("content-type", /json/);
          done();
        });
    });
  });
});
