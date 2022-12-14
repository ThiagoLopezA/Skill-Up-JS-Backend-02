"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },
      toUserId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "categories", key: "id" },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transactions");
  },
};
