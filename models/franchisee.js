'use strict';
module.exports = (sequelize, DataTypes) => {
  const Franchisee = sequelize.define('franchisee', {
    userId: DataTypes.INTEGER,
    franchisorId: DataTypes.INTEGER,
    outletCode: DataTypes.STRING,
    outletName: DataTypes.STRING,
    location: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});

  Franchisee.associate = function(models) {
    // associations can be defined here
  };

  return Franchisee;
};