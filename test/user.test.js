const request = require("supertest");
const app = require("../app");

/**
 * Testing Users
 */

describe("GET /users/:id", () => {
  it("respond with json containing a user", (done) => {
    request(app)
      .get("/users/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("respond with HTML Error `User not found` when the user does not exist", (done) => {
    request(app)
      .get("/users/101")
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(404)
      .end(done);
  });
});

describe("POST /users", (done) => {
  it("respond with `User created successfully`", (done) => {
    const data = {
      first_name: "Edna",
      last_name: "Krabappel",
      email: "edna@mail.com",
      password: "Hola1234",
    };
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);
  });
});
