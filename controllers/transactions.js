const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const {
  getOne,
  deleteOne,
  createOne,
  getAllUserTransactions,
} = require("../services/transactions.service");
const jwt = require("../helpers/jwt.helper");

module.exports = {
  getOne: catchAsync(async (req, res, next) => {
    try {
      const response = await getOne(req.params.id);
      const encrypted = jwt.encode(response.dataValues, "1m");
      endpointResponse({
        res,
        message: "Transaction retrieved successfully",
        body: { encrypted },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [/:id - GET]: ${error.message}`
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
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting transaction] - [/:id - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),

  createOne: catchAsync(async (req, res, next) => {
    try {
      const response = await createOne(req.body);
      const encrypted = jwt.encode(response.dataValues, "1m");
      endpointResponse({
        res,
        message: "Transaction created successfully",
        body: { encrypted },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to create transaction] - [POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  getAllUserTransactions: catchAsync(async (req, res, next) => {
    try {
      const response = await getAllUserTransactions(req.body);
      const encrypted = jwt.encode(response.dataValues, "1m");
      endpointResponse({
        res,
        message: "All available transactions obtained successfully",
        body: { encrypted },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to get transaction] - [GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
