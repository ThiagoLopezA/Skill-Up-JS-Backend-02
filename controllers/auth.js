const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const JWT = require("../helpers/jwt.helper");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error trying to authenticate user] - [/auth/login - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
