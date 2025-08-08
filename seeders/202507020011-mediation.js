'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('mediations', [{
      complaintId: 1,
      mediatorId: 6,
      schedule: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 hari dari sekarang
      location: 'Ruang Mediasi Online - Zoom',
      result: null,
      verdictFile: null,
      verdictHash: null,
      status: 'scheduled',
      chainTxId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('mediations', null, {});
  }
};
