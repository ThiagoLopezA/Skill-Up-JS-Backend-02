"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        firstName: "Carlos",
        lastName: "Sosa",
        email: "carlos@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Marta",
        lastName: "Casas",
        email: "marta@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Juan",
        lastName: "Perez",
        email: "Juan@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Maria",
        lastName: "Gonzalez",
        email: "maria@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Juan",
        lastName: "Fernandez",
        email: "juan@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Ana",
        lastName: "Rios",
        email: "ana@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Marcos",
        lastName: "Oviedo",
        email: "marcos@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Cristina",
        lastName: "Ramos",
        email: "cristina@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Pedro",
        lastName: "Lagos",
        email: "pedro@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Karina",
        lastName: "Garcia",
        email: "karina@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Marcelo",
        lastName: "Sousa",
        email: "marcelo@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Marina",
        lastName: "Doitte",
        email: "marina@mail.com",
        avatar: "1.img",
        password:"Hola1234",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};