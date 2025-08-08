'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mediation = sequelize.define('mediation', {

    complaintId: DataTypes.INTEGER,
    mediatorId: DataTypes.INTEGER,
    schedule: DataTypes.DATE,
    location: DataTypes.STRING,
    result: DataTypes.TEXT,
    verdictFile: DataTypes.STRING,
    verdictHash: DataTypes.STRING,
    status: DataTypes.ENUM('scheduled', 'completed', 'rejected'),
    chainTxId: DataTypes.STRING

  }, {});

  Mediation.associate = function(models) {
    // associations can be defined here
  };

  return Mediation;
};