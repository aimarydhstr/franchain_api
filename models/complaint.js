'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('complaint', {

    consumerId: DataTypes.INTEGER,
    franchiseeId: DataTypes.INTEGER,
    agreementId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    violationType: DataTypes.ENUM('expired', 'bad_quality', 'late', 'incomplete', 'others'),
    evidenceFile: DataTypes.STRING,
    evidenceHash: DataTypes.STRING,
    penalty: DataTypes.INTEGER,
    status: DataTypes.ENUM('open', 'resolved', 'escalated'),
    resolvedBy: DataTypes.ENUM('system', 'regulator', 'mediator'),
    chainTxId: DataTypes.STRING
  }, {});

  Complaint.associate = function(models) {
    // associations can be defined here
  };

  return Complaint;
};