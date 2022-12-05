const { ErrorObject } = require("../helpers/error");
const { Transaction } = require("../database/models");

exports.createOne = async (props) => {
  try {
    if (!props.userId || !props.categoryId) {
      throw new ErrorObject("Incomplete data", 400);
    }
    const newTransaction = await Transaction.create({
      amount: props.amount,
      date: props.date,
      userId: props.userId,
      categoryId: props.categoryId,
    });
    return newTransaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
