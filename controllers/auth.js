const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error trying to authenticate user] - [/auth/login - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
