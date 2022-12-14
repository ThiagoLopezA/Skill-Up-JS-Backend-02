const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const {
  getOne,
  getAll,
  deleteOne,
  editOne,
  createOne,
} = require("../services/categories.service");

module.exports = {
  getOne: catchAsync(async (req, res, next) => {
    try {
      const response = await getOne(req.params.id);
      endpointResponse({
        res,
        message: "Category retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [/:id - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  deleteOne: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const response = await deleteOne(id);
      endpointResponse({
        res,
        message: "Category deleted successfully",
        body: response,
        code: 202,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting category] - [/:id - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getAll: catchAsync(async (req, res, next) => {
    try {
      const response = await getAll();
      endpointResponse({
        res,
        message: "Categories retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving categories] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  editOne: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = req.body;
      const response = await editOne(id, category);
      endpointResponse({
        res,
        message: "Category edited successfully",
        body: response,
        code: 202,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error editing category] - [/:id - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),
  createCategory: catchAsync(async (req, res, next) => {
    try {
      const response = await createOne(req.body);
      endpointResponse({
        res,
        message: "Category created successfully",
        body: response,
        code: 201,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating a category] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
