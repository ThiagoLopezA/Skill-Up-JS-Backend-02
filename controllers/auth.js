const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { getByEmail } = require("../services/users.service");
const bcrypt = require("../helpers/bcrypt.helper");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await getByEmail(email);
      const match = await bcrypt.compare(password, user.password);
      if (!match) endpointResponse({ res, body: { ok: false } });
      endpointResponse({
        res,
        message: "Authenticated successfully",
        body: { ...user.dataValues },
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
