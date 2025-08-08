'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('contract', {

    franchisorId: DataTypes.INTEGER,
    franchiseeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    fileUrl: DataTypes.STRING,
    ipfsHash: DataTypes.STRING,
    status: DataTypes.ENUM('draft', 'active', 'terminated'),
    endDate: DataTypes.DATE,
    chainTxId: DataTypes.STRING

  }, {});

  Contract.associate = function(models) {
    // associations can be defined here
  };

  return Contract;
};