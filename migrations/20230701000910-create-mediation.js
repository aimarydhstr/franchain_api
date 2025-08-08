'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mediations', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      complaintId: { type: Sequelize.INTEGER, references: { model: 'complaints', key: 'id' }, onDelete: 'CASCADE' },
      mediatorId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      schedule: { type: Sequelize.DATE },
      location: { type: Sequelize.STRING },
      result: { type: Sequelize.TEXT },
      verdictFile: { type: Sequelize.STRING },
      verdictHash: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('scheduled', 'completed', 'rejected'), defaultValue: 'scheduled' },
      chainTxId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mediations');
  }
};