"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "userId" });
      Transaction.belongsTo(models.Category, { foreignKey: "categoryId" });
      Transaction.belongsTo(models.User, { foreignKey: "toUserId" });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: { type: DataTypes.STRING},
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      date: { type: DataTypes.DATE },
      userId: DataTypes.INTEGER,
      toUserId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Transaction",
      paranoid: true,
    }
  );
  return Transaction;
};
