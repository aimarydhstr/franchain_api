'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComplaintRule = sequelize.define('complaint_rule', {
    franchisorId: DataTypes.INTEGER,
    violationType: DataTypes.ENUM('late'),
    maxDeliveryTime: DataTypes.INTEGER,
    autoCompensationAmount: DataTypes.INTEGER,
    autoCompensationType: DataTypes.ENUM('refund', 'voucher', 'discount'),
    status: DataTypes.ENUM('active', 'inactive'),
  }, {});

  ComplaintRule.associate = function(models) {
    // associations can be defined here
  };

  return ComplaintRule;
};