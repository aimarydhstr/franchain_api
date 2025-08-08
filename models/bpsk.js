'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bpsk = sequelize.define('bpsk', {

    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING

  }, {});

  Bpsk.associate = function(models) {
    // associations can be defined here
  };

  return Bpsk;
};