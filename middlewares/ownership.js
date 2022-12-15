const { decode } = require("../helpers/jwt.helper");
const { ErrorObject } = require("../helpers/error");
const { catchAsync } = require("../helpers/catchAsync");
const User = require("../services/users.service");
const Transaction = require("../services/transactions.service");
const validateAuth = require("../helpers/validateAuth");

exports.ownUser = catchAsync(async (req, res, next) => {
  try {
    const decoded = await validateAuth(req.headers);
    const user = await User.getUser(req.params.id);
    if (decoded.id === user.id || decoded.roleId === 2) return next();
    throw new ErrorObject("Access denied", 403);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  try {
    const decoded = await validateAuth(req.headers);
    const user = await User.getUser(decoded.id);
    if (user.roleId === 2) return next();
    throw new ErrorObject("Not authorized", 403);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});

exports.ownTransaction = catchAsync(async (req, res, next) => {
  try {
    const decoded = await validateAuth(req.headers);
    const transaction = await Transaction.getOne(req.params.id);
    if (decoded.id === transaction.userId || decoded.roleId === 2) {
      return next();
    }
    throw new ErrorObject("Access denied", 403);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
});
