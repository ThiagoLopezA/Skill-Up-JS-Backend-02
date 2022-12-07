const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { getOne, deleteOne,createOne, getAllTransactions } = require("../services/transactions.service");

module.exports = {
  getOne: catchAsync(async (req, res, next) => {
    try {
      const response = await getOne(req.params.id);
      endpointResponse({
        res,
        message: "Transaction retrieved successfully",
        body: response,
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
      const response = await deleteOne(id);
      endpointResponse({
        res,
        message: "Transaction deleted successfully",
        body: response,
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
      endpointResponse({
        res,
        message: "Transaction created successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to create transaction] - [POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getAllTransactions: catchAsync(async (req, res, next) => {
    try {
      const response = await getAllTransactions(req.body);
      endpointResponse({
        res,
        message: "All available transactions obtained successfully",
        body: response,
      });
      

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to get transactions] - [GET]: ${error.message}`
      );
      next(httpError);
    }

})
};
