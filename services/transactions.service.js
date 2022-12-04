const { ErrorObject } = require("../helpers/error");
const { Transaction } = require("../database/models");

exports.deleteOne = async (id) => {
  try {
    const transaction = await Transaction.findByPk(id);
    if (transaction !== null) {
      const destroy = await Transaction.destroy({ where: { id } });
      return transaction;
    }
    throw new ErrorObject("Transaction not found", 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};