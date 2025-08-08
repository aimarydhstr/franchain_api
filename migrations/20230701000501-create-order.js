'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      transactionId: { type: Sequelize.INTEGER, references: { model: 'transactions', key: 'id' }, onDelete: 'CASCADE' },
      consumerId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      productId: {  type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      qty: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};