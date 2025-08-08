'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bpsks', [
      {
        id: 1,
        name: 'BPSK Kota Yogyakarta',
        city: 'Yogyakarta',
        address: 'Jl. Laksda Adisucipto No. 99',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bpsks', null, {});
  }
};