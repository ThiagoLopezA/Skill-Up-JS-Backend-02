const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { getOne } = require("../services/categories.service");

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
};
