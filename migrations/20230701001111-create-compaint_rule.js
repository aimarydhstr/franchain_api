'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('complaint_rules', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      franchisorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'franchisors', key: 'id' },
        onDelete: 'CASCADE'
      },
      violationType: {
        type: Sequelize.ENUM('late'),
        allowNull: false,
        defaultValue: 'late'
      },
      maxDeliveryTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Waktu maksimal pengiriman (dalam jam atau menit tergantung sistem transaksi)'
      },
      autoCompensationAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Jumlah kompensasi otomatis jika terlambat'
      },
      autoCompensationType: {
        type: Sequelize.ENUM('refund', 'voucher', 'discount'),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('complaint_rules');
  }
};
