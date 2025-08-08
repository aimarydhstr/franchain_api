// models/audit_score.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuditScore = sequelize.define('audit_score', {
    franchiseeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    calculatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reputation: {
      type: DataTypes.ENUM('Trusted', 'Compliant', 'Under Watch'),
      allowNull: false
    },
    chainTxId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'audit_scores',
    underscored: false,
    timestamps: true
  });


  return AuditScore;
};
