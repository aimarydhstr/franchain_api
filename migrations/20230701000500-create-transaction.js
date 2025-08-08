'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      consumerId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      franchiseeId: { type: Sequelize.INTEGER, references: { model: 'franchisees', key: 'id' }, onDelete: 'CASCADE' },
      total: { type: Sequelize.INTEGER },
      timestamp: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING, defaultValue: 'pending' },
      chainTxId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};