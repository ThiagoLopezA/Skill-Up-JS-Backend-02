const { ErrorObject } = require("../helpers/error");
const { Transaction, User } = require("../database/models");

exports.deleteOne = async id => {
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ErrorObject("Transaction not found", 404);
    await Transaction.destroy({ where: { id } });
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getOne = async id => {
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new ErrorObject("Transaction not found", 404);
    return transaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.createOne = async props => {
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

exports.getAllUserTransactions = async () => {
  try {
    const allTransactions = await Transaction.findAll({ raw: true });

    return allTransactions;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.editTransaction = async (id, props) => {
  try {
    const transaction = await Transaction.findOne(
      { where: { id: id } },
      { include: User }
    );
    if (!transaction) {
      throw new ErrorObject("Transaction not found", 404);
    }
    transaction.categoryId = props.category;
    transaction.userId = props.user;
    transaction.amount = props.amount;
    transaction.date = props.date;

    await Transaction.update(transaction, { where: { id } });
    return transaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getBalance = async userId => {
  try {
    const transactionsToUser = await Transaction.findAll({
      where: { toUserId: userId },
      raw: true,
    });
    const transactionsFromUser = await Transaction.findAll({
      where: { userId },
      raw: true,
    });
    const loads = await Transaction.findAll({
      where: { toUserId: userId, userId: userId },
      raw: true,
    });
    let balance = 0;
    transactionsFromUser.forEach(transaction => {
      balance -= transaction.amount;
    });
    transactionsToUser.forEach(transaction => {
      balance += transaction.amount;
    });
    loads.forEach(transaction => {
      balance += transaction.amount;
    });
    return balance;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
