'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clarification = sequelize.define('clarification', {
    complaintId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    fileUrl: DataTypes.STRING,
    ipfsHash: DataTypes.STRING,
    submittedAt: DataTypes.DATE,
    chainTxId: DataTypes.STRING,
  }, {});

  Clarification.associate = function(models) {
    // associations can be defined here
  };

  return Clarification;
};
