const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { getByEmail } = require("../services/users.service");
const bcrypt = require("../helpers/bcrypt.helper");
const jwt = require("../helpers/jwt.helper");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await getByEmail(email);
      const match = await bcrypt.compare(password, user.password);
      if (!match) endpointResponse({ res, body: { ok: false } });
      delete user.dataValues.password;
      const response = jwt.encode(user.dataValues, "30m");
      endpointResponse({
        res,
        message: "Authenticated successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error trying to authenticate user] - [/auth/login - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
