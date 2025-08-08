'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('orders', [
      {
        id: 3,
        transactionId: 1,
        consumerId: 4,
        productId: 1,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};