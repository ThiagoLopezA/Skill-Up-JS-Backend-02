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
const TransactionService = require("../services/transactions.service");
const bcrypt = require("../helpers/bcrypt.helper");
const jwt = require("../helpers/jwt.helper");

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await findAll();
      const encrypted = jwt.encode({ users: response }, "10m");
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: { encrypted },
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
      await deleteOne(id);
      endpointResponse({
        res,
        message: "User deleted successfully",
        code: 202,
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
      const encrypted = jwt.encode(response, "10m");
      endpointResponse({
        res,
        message: "User retrieved successfully",
        body: { encrypted },
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
      if (req.file) userData.avatar = req.file.filename;
      await editUser(id, userData);
      endpointResponse({
        res,
        message: "User update successfully",
        code: 202,
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
      if (req.file) user.avatar = req.file.filename;
      const response = await createUser(user);
      const encrypted = jwt.encode(response.dataValues, "10m");
      endpointResponse({
        res,
        message: "User created successfully",
        body: { encrypted },
        code: 201,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  getTransactions: catchAsync(async (req, res, next) => {
    try {
      const response = await TransactionService.getUserTransactions(
        req.params.id
      );
      const encrypted = jwt.encode({ transactions: response }, "10m");
      endpointResponse({
        res,
        message: "User transactions retrieved successfully",
        body: { encrypted },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user transactions] - [/:id/transactions - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getBalance: catchAsync(async (req, res, next) => {
    try {
      const balance = await TransactionService.getBalance(req.params.id);
      const encrypted = jwt.encode({ balance }, "10m");
      endpointResponse({
        res,
        message: "Balance retrieved succesfully",
        body: encrypted,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user transactions] - [/:id/balance - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
