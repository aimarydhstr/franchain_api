'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('complaint_rules', [{
      franchisorId: 1,
      violationType: 'late',
      maxDeliveryTime: 90,
      autoCompensationAmount: 15000,
      autoCompensationType: 'discount',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('complaint_rules', null, {});
  }
};
