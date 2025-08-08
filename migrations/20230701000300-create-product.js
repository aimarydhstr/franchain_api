'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      franchiseeId: { type: Sequelize.INTEGER, references: { model: 'franchisees', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.INTEGER },
      status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};