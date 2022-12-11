const { decode, verify } = require("../helpers/jwt.helper");
const { ErrorObject } = require("../helpers/error");
const { findUser } = require("../services/users.service");
const { catchAsync } = require("../helpers/catchAsync");

const authentication = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = decode(token);
    const verified = verify(token);
    const { iat, exp, ...user } = decoded;
    const find = await findUser(user);
    if (!find || !verified) throw new ErrorObject("Invalid token", 403);
    return next();
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});

module.exports = authentication;