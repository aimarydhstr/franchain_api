'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('complaints', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      consumerId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      franchiseeId: { type: Sequelize.INTEGER, references: { model: 'franchisees', key: 'id' }, onDelete: 'CASCADE' },
      transactionId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'transactions', key: 'id' }, onDelete: 'SET NULL' },
      agreementId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'agreements', key: 'id' }, onDelete: 'SET NULL' },
      description: { type: Sequelize.TEXT },
      violationType: {
        type: Sequelize.ENUM('expired', 'bad_quality', 'late', 'incomplete', 'others'),
        allowNull: true
      },
      evidenceFile: { type: Sequelize.STRING },
      evidenceHash: { type: Sequelize.STRING },
      penalty: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.ENUM('open', 'resolved', 'escalated'), defaultValue: 'open' },
      resolvedBy: {
        type: Sequelize.ENUM('system', 'regulator', 'mediator'),
        allowNull: true
      },
      chainTxId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('complaints');
  }
};