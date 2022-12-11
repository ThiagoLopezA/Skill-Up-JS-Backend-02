"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Transactions", [
      {
        description: "Some description",
        amount: 500.1,
        userId: 1,
        categoryId: 1,
      },
      {
        description: "Some diferent description",
        amount: 500.1,
        userId: 2,
        categoryId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Transactions", null, {});
  },
};
