'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('franchisees', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      franchisorId: { type: Sequelize.INTEGER, references: { model: 'franchisors', key: 'id' }, onDelete: 'CASCADE' },
      outletCode: { type: Sequelize.STRING, unique: true },
      outletName: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('franchisees');
  }
};