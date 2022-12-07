const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const {
  getUser,
  deleteOne,
  editUser,
  createUser,
  findAll,
} = require("../services/users.service");
const bcrypt = require("../helpers/bcrypt.helper");
const jwt = require("../helpers/jwt.helper");

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await findAll();
      const encrypted = jwt.encode(response, "1m");
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: encrypted,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  deleteOne: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await deleteOne(id);
      const encrypted = jwt.encode(response, "1m");
      endpointResponse({
        res,
        message: "User deleted successfully",
        body: encrypted,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [/:id - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getOne: catchAsync(async (req, res, next) => {
    try {
      const response = await getUser(req.params.id);
      endpointResponse({
        res,
        message: "User retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [/:id - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  editUser: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      const response = await editUser(id, userData);
      endpointResponse({
        res,
        message: "User update successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating user] - [/:id - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      const user = req.body;
      user.password = await bcrypt.hash(req.body.password);
      const response = await createUser(user);
      endpointResponse({
        res,
        message: "User created successfully",
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
