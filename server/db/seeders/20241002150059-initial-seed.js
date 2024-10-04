'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [
      {
        name: 'ФКУ СИЗО - 1 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 2 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 3 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 4 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 5 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 6 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ФКУ СИЗО - 7 УФСИН России по г. Москве',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  }
};
