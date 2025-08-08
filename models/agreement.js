'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agreement = sequelize.define('agreement', {

    franchisorId: DataTypes.INTEGER,
    franchiseeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    ipfsHash: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'approved', 'rejected'),
    chainTxId: DataTypes.STRING

  }, {});

  Agreement.associate = function(models) {
    // associations can be defined here
  };

  return Agreement;
};