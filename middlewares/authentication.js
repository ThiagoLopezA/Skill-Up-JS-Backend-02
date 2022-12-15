const { decode, verify } = require("../helpers/jwt.helper");
const { ErrorObject } = require("../helpers/error");
const { getUser } = require("../services/users.service");
const { catchAsync } = require("../helpers/catchAsync");

const authentication = catchAsync(async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) throw new ErrorObject("Token do not exist", 404);
    const token = auth.split(" ")[1];
    const decoded = decode(token);
    const verified = verify(token);
    const { id } = decoded;
    const find = await getUser(id);
    if (!find || !verified) throw new ErrorObject("Invalid token", 403);
    return next();
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});

module.exports = authentication;
