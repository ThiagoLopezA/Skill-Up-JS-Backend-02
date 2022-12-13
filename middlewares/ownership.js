const { decode } = require("../helpers/jwt.helper");
const { ErrorObject } = require("../helpers/error");
const { catchAsync } = require("../helpers/catchAsync");
const User = require("../services/users.service");
const Transaction = require("../services/transactions.service");

exports.ownUser = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = decode(token);
    const user = await User.getUser(req.params.id);
    if (decoded.id === user.id || decoded.roleId === 2) return next();
    throw new ErrorObject("Access denied", 403);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});

exports.ownTransaction = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = decode(token);
    const transaction = await Transaction.getOne(req.params.id);
    if (decoded.id === transaction.userId || decoded.roleId === 2)
      return next();
    throw new ErrorObject("Access denied", 403);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});
