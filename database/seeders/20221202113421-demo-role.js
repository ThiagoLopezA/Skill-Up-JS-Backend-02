'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Roles", [
      {
        name: "Standard",
        description: "Standard user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        description: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Regular",
        description: "Regular user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Roles", null, {});
  }
};
