"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Categories", [
      {
        name: "Incomes",
        description: "Every type of incomes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Outcomes",
        description: "Every type of outcomes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Categories", null, {});
  },
};
