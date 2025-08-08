'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('audits', [
      {
        id: 1,
        complaintId: 1,
        franchiseeId: 1,
        description: 'Audit atas pengaduan konsumen Jogja 1',
        auditDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('audits', null, {});
  }
};