"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Transactions", [
      {
        description: "User #1 charged himself $500",
        amount: 500,
        userId: 1,
        categoryId: 1,
        toUserId: 1,
      },
      {
        description: "User #2 receive $250 from User #1",
        amount: 250,
        userId: 1,
        categoryId: 2,
        toUserId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Transactions", null, {});
  },
};
