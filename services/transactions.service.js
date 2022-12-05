const { ErrorObject } = require("../helpers/error");
const { Transaction, User } = require("../database/models");

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

exports.getOne = async (id) => {
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ErrorObject("Transaction not found", 404);
    return transaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.createOne = async (props) => {
  try {
    if (!props.userId || !props.amount || !props.date || !props.categoryId) {
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