const { ErrorObject } = require("../helpers/error");
const jwt = require("../helpers/jwt.helper");
const { catchAsync } = require("../helpers/catchAsync");
const { Transaction } = require("../database/models");

const accessTransaction = catchAsync(async (req, res, next) => {
  const auth = await req.headers["authorization"];
  if (!auth) throw new ErrorObject("Token do not exist", 404);
  const token = auth.split(" ")[1];
  const verified = jwt.verify(token);
  const { id } = req.params;
  const findTransaction = await Transaction.findOne({ where: { id } });
  if (!verified || !findTransaction)
    throw new ErrorObject("Access denied", 403);
  return next();
});

module.exports = accessTransaction;
