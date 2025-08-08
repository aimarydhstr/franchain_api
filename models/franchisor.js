'use strict';
module.exports = (sequelize, DataTypes) => {
  const Franchisor = sequelize.define('franchisor', {

    userId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    npwp: DataTypes.STRING,
    address: DataTypes.STRING,
    nib: DataTypes.STRING,
    financialFile: DataTypes.STRING,
    ipfsHash: DataTypes.STRING,
    verified: DataTypes.STRING

  }, {});

  Franchisor.associate = function(models) {
    // associations can be defined here
  };

  return Franchisor;
};