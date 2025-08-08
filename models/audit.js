'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('audit', {

    complaintId: DataTypes.INTEGER,
    franchiseeId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    auditDate: DataTypes.DATE

  }, {});

  Audit.associate = function(models) {
    // associations can be defined here
  };

  return Audit;
};