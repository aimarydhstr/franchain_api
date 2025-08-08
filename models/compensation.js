'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compensation = sequelize.define('compensation', {
    complaintId: DataTypes.INTEGER,
    type: DataTypes.ENUM('refund', 'voucher', 'discount'),
    amount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('pending', 'approved', 'rejected'),
    chainTxId: DataTypes.STRING,
    resolvedBy: DataTypes.ENUM('system', 'franchisor', 'regulator', 'mediator'),
  }, {});

  Compensation.associate = function(models) {
    // associations can be defined here
  };

  return Compensation;
};