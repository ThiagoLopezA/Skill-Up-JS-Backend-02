"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Categories", [
      {
        name: "Incomes",
        description: "Every type of incomes",
      },
      {
        name: "Outcomes",
        description: "Every type of outcomes",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Categories", null, {});
  },
};
