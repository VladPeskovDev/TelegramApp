'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [
      {
        name: 'Сизо 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сизо 7',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  }
};
