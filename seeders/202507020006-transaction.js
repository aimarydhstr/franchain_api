'use strict';

const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data1 = {
      id: 1,
      consumerId: 4,
      franchiseeId: 1,
      total: 20000,
      timestamp: new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await queryInterface.bulkInsert('transactions', [data1]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};