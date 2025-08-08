'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compensations', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      complaintId: { type: Sequelize.INTEGER, references: { model: 'complaints', key: 'id' }, onDelete: 'CASCADE' },
      type: {
        type: Sequelize.ENUM('refund', 'voucher', 'discount'),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      resolvedBy: {
        type: Sequelize.ENUM('system', 'franchisor', 'regulator', 'mediator'),
        allowNull: true
      },
      chainTxId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compensations');
  }
};