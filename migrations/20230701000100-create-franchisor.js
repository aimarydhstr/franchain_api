'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('franchisors', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      companyName: { type: Sequelize.STRING, allowNull: true },
      npwp: { type: Sequelize.STRING, allowNull: true },
      address: { type: Sequelize.STRING, allowNull: true },
      nib: { type: Sequelize.STRING, allowNull: true },
      financialFile: { type: Sequelize.STRING, allowNull: true },
      ipfsHash: { type: Sequelize.STRING, allowNull: true },
      verified: { type: Sequelize.STRING, defaultValue: 'pending' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('franchisors');
  }
};