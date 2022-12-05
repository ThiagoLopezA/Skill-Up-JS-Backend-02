const { ErrorObject } = require("../helpers/error");
const { Transaction } = require("../database/models");

exports.getOne = async (id) => {
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ErrorObject("Transaction not found", 404);
    return transaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
