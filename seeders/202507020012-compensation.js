'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('compensations', [
      {
        id: 1,
        complaintId: 1,
        type: 'voucher',
        amount: 10000,
        description: 'Voucher untuk pengembalian uang',
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('compensations', null, {});
  }
};