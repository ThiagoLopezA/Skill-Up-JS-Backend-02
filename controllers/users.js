const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { getUser, deleteOne, createUser } = require("../services/users.service");
const bcrypt = require("../helpers/bcrypt.helper");


// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll();
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: response,
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
      endpointResponse({
        res,
        message: "User deleted successfully",
        body: response,
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
  create: catchAsync(async (req, res, next) => {
    try {
      const user = req.body;
      user.password = await bcrypt.hash(req.body.password)
      console.log(user)
      const response = await createUser(user);
      endpointResponse({
        res,
        message: "User created successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creting user] - [POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
