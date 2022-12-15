const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const PATH = "/categories";
const { expect } = require("chai");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe(`GET ${PATH}`, () => {
  it("should get an array of categories", (done) => {
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

describe(`GET ${PATH}/:id`, () => {
  it("should get the income category", (done) => {
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

  it("should respond with a 'Category not found' error when the category doesn't exist", (done) => {
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

describe(`PUT ${PATH}/:id`, () => {
  it("should update the income category", (done) => {
    const data = {
      name: "Income",
      description: "This is an edited Income category",
    };
    chai
      .request(app)
      .put(`${PATH}/1`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(202);
        res.should.have.header("content-type", /json/);
        done();
      });
  });
  it("shouldn't update the income category because it doesn't exists", (done) => {
    const data = {
      name: "EditedIncome",
      description: "This is an edited Income category",
    };
    chai
      .request(app)
      .put(`${PATH}/-1`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe(`POST ${PATH}`, () => {
  it("should create a category", (done) => {
    const data = {
      name: "Entertainment",
      description: "All kind of entertainment charges",
    };
    chai
      .request(app)
      .post(`${PATH}`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.have.header("content-type", /json/);
        done();
      });
  });
  it("shouldn't create a category (incomplete values)", (done) => {
    const data = {
      name: "Entertainment",
    };
    chai
      .request(app)
      .post(`${PATH}`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(422);
        res.should.have.header("content-type", /html/);
        done();
      });
  });
});

describe(`DELETE ${PATH}/:id`, () => {
  it("should delete the incomes category", (done) => {
    chai
      .request(app)
      .delete(`${PATH}/3`)
      .end((err, res) => {
        res.should.have.status(202);
        done();
      });
  });
  it("shouldn't delete the category because it doesn't exists", (done) => {
    chai
      .request(app)
      .delete(`${PATH}/15`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
