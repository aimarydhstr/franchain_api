'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('audit_scores', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      franchiseeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'franchisees', key: 'id' },
        onDelete: 'CASCADE'
      },
      score: { type: Sequelize.FLOAT, allowNull: false },
      calculatedAt: { type: Sequelize.DATE, allowNull: false },
      reputation: {
        type: Sequelize.ENUM('Trusted', 'Compliant', 'Under Watch'),
        allowNull: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('audit_scores');
  }
};
