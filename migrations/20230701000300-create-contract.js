'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contracts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      franchisorId: { type: Sequelize.INTEGER, references: { model: 'franchisors', key: 'id' }, onDelete: 'CASCADE' },
      franchiseeId: { type: Sequelize.INTEGER, references: { model: 'franchisees', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      fileUrl: { type: Sequelize.STRING },
      ipfsHash: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('draft', 'active', 'terminated'), defaultValue: 'draft' },
      endDate: { type: Sequelize.DATE },
      chainTxId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contracts');
  }
};