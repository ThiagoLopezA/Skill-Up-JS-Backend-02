const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { createOne } = require("../services/transactions.service");

module.exports = {
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
};
