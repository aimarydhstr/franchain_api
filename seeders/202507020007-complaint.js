'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('complaints', [
      {
        consumerId: 4,
        franchiseeId: 1,
        transactionId: 1,
        agreementId: 1,
        description: 'Makanan dingin dan pelayanan lambat',
        violationType: 'bad_quality',
        evidenceFile: 'uploads/complaints/evidence1.jpg',
        evidenceHash: 'abc123def456gh789ijk',
        penalty: 0,
        status: 'open',
        resolvedBy: null,
        chainTxId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('complaints', null, {});
  }
};