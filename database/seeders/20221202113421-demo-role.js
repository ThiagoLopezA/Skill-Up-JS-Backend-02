"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Roles", [
      {
        name: "Standard",
        description: "Standard user",
      },
      {
        name: "Admin",
        description: "Admin",
      },
      {
        name: "Regular",
        description: "Regular user",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Roles", null, {});
  },
};
