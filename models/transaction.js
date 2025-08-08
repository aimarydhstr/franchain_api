'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    consumerId: DataTypes.INTEGER,
    franchiseeId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    status: DataTypes.STRING,
    chainTxId: DataTypes.STRING
  }, {});

  Transaction.associate = function(models) {
    // associations can be defined here
  };

  return Transaction;
};