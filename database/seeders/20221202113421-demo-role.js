'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Roles", [
      {
        name: "user",
        description: "Single user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "admin",
        description: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Roles", null, {});
  }
};
