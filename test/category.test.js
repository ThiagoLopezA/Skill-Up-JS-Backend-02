const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const PATH = "/categories";
const { expect } = require("chai");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe(`GET ${PATH}`, done => {
  it("respond with json containing an array of 2 categories", done => {
    chai
      .request(app)
      .get(`${PATH}`)
      .end((err, res) => {
        const { body: data } = res.body;
        expect(data).to.have.lengthOf(2);
        res.should.have.status(200);
        done();
      });
  });
});

describe(`GET ${PATH}/:id`, done => {
  it("respond with json containing the income category", done => {
    chai
      .request(app)
      .get(`${PATH}/1`)
      .end((err, res) => {
        const { body: data } = res.body;
        expect(data).to.have.property("name").eq("Incomes");
        res.should.have.status(200);
        done();
      });
  });

  it("responds with Error 'Category not found' when the category doesn't exist", done => {
    chai
      .request(app)
      .get(`${PATH}/15`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.have.header("content-type", "text/html; charset=utf-8");
        done();
      });
  });
});
