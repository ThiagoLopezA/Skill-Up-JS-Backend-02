'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'userId'})
      Transaction.belongsTo(models.Category, { foreignKey: 'categoryId'})
    }
  };
  Transaction.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    description: {type: DataTypes.STRING, allowNull: true },
    amount: {type: DataTypes.DECIMAL, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    deletedAt: {
        type: DataTypes.STRING
      },
  }, {
    sequelize, 
    timestamps: true,
    modelName: 'Transaction',
  });
  return Transaction;
};