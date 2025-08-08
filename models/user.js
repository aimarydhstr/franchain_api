'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {

    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'franchisor', 'franchisee', 'consumer', 'regulator', 'mediator'),
    email: DataTypes.STRING,
    status: DataTypes.STRING

  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};