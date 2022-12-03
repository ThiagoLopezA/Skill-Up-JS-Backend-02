const { ErrorObject } = require("../helpers/error");
const { Transaction, User } = require("../database/models");
const { json } = require("sequelize");

exports.createOne = async (props) => {
  try {
    if (!props.userId || !props.amount || !props.date || !props.categoryId) {
      throw new ErrorObject("Incomplete data", 404);
    }
    const newTransaction = await Transaction.create({
      amount: props.amount,
      date: props.date,
      userId: props.userId,
      categoyId: props.categoryId,
    });
    return newTransaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getAllUserTransactions = async (props) => {
  try {
    const allTransactions = await Transaction.findAll(
      { where: { userId: props.userId } },
      { include: User }
    );

    return allTransactions;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
