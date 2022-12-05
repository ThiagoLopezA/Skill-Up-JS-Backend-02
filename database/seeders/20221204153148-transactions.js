'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Transactions", [
      {
        description:"Some description",
        amount:500.10,
        date:new Date(),
        userId:1,
        categoryId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description:"Some diferent description",
        amount:500.10,
        date:new Date(),
        userId:2,
        categoryId:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.bulkDelete("Transactions", null, {});

  }
};
