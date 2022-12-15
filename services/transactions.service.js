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
    const transaction = await Transaction.findByPk(id, {
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    });
    if (!transaction) throw new ErrorObject("Transaction not found", 404);
    return transaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.createOne = async props => {
  try {
    const newTransaction = await Transaction.create(props, { raw: true });
    return newTransaction;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getAllTransactions = async () => {
  try {
    const allTransactions = await Transaction.findAll({ raw: true });
    return allTransactions;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getUserTransactions = async userId => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: userId },
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    });
    return transactions;
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
      where: { toUserId: userId, categoryId: 2 },
      raw: true,
    });
    const transactionsFromUser = await Transaction.findAll({
      where: { userId, categoryId: 2 },
      raw: true,
    });
    const loads = await Transaction.findAll({
      where: { toUserId: userId, userId: userId, categoryId: 1 },
      raw: true,
    });
    let balance = 0;
    transactionsFromUser.forEach(transaction => {
      balance -= parseInt(transaction.amount);
    });
    transactionsToUser.forEach(transaction => {
      balance += parseInt(transaction.amount);
    });
    loads.forEach(transaction => {
      balance += parseInt(transaction.amount);
    });
    return balance;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
