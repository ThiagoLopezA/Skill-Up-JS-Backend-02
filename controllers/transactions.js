const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const {
  getOne,
  deleteOne,
  createOne,
  getAllTransactions,
  editTransaction,
  getBalance,
} = require("../services/transactions.service");
const UserService = require("../services/users.service");
const CategoryService = require("../services/categories.service");
const jwt = require("../helpers/jwt.helper");
const { ErrorObject } = require("../helpers/error");

module.exports = {
  getOne: catchAsync(async (req, res, next) => {
    try {
      const response = await getOne(req.params.id);
      const encrypted = jwt.encode(response.dataValues, "10m");
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
        code: 202,
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
      let response;
      const { userId, categoryId } = req.body;
      const category = await CategoryService.getOne(categoryId);
      const user = await UserService.getUser(userId);
      if (!category) throw new ErrorObject("Invalid category", 400);
      if (!user) throw new ErrorObject("Category not found", 404);
      if (category.name === "Outcomes") {
        const balance = await getBalance(userId);
        if (!req.body.toUserId) throw new ErrorObject("Invalid toUserId", 400);
        if (balance < req.body.amount) {
          throw new ErrorObject("Insufficient balance", 400);
        }
        let transaction = await createOne(req.body);
        response = await getOne(transaction.id);
      }
      if (category.name === "Incomes") {
        req.body.toUserId = userId;
        let transaction = await createOne(req.body);
        response = await getOne(transaction.id);
      }
      const encrypted = jwt.encode({ response }, "10m");
      endpointResponse({
        res,
        message: "Transaction created successfully",
        body: { encrypted },
        code: 201,
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
      const encrypted = jwt.encode({ response }, "10m");
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
  editOne: catchAsync(async (req, res, next) => {
    try {
      const response = await editTransaction(req.params.id, req.body);
      const encrypted = jwt.encode(response.dataValues, "10m");
      endpointResponse({
        res,
        message: "Update transaction successfully",
        body: { encrypted },
        code: 202,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating transaction] - [/:id - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
