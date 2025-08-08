'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('franchisees', [
      {
        id: 1,
        userId: 3,
        franchisorId: 1,
        outletCode: 'DIY001',
        outletName: 'Mie Gacoan Jogja 1',
        location: 'Jl. Kaliurang No. 10, Yogyakarta',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('franchisees', null, {});
  }
};