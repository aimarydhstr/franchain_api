module.exports = (db) => {
  const {
    user,
    franchisor,
    franchisee,
    contract,
    agreement,
    transaction,
    complaint,
    clarification,
    audit,
    compensation,
    mediation,
    bpsk,
    complaint_rule,
    audit_score,
    product,
    order
  } = db;

  user.hasOne(franchisor, { foreignKey: 'userId' });
  franchisor.belongsTo(user, { foreignKey: 'userId' });

  user.hasOne(franchisee, { foreignKey: 'userId' });
  franchisee.belongsTo(user, { foreignKey: 'userId' });

  franchisor.hasMany(franchisee, { foreignKey: 'franchisorId' });
  franchisee.belongsTo(franchisor, { foreignKey: 'franchisorId' });

  franchisor.hasMany(contract, { foreignKey: 'franchisorId' });
  contract.belongsTo(franchisor, { foreignKey: 'franchisorId' });

  franchisor.hasMany(agreement, { foreignKey: 'franchisorId' });
  agreement.belongsTo(franchisor, { foreignKey: 'franchisorId' });

  franchisee.hasMany(contract, { foreignKey: 'franchiseeId' });
  contract.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  franchisee.hasMany(transaction, { foreignKey: 'franchiseeId' });
  transaction.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  franchisee.hasMany(complaint, { foreignKey: 'franchiseeId' });
  complaint.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  franchisee.hasMany(audit, { foreignKey: 'franchiseeId' });
  audit.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  franchisee.hasMany(agreement, { foreignKey: 'franchiseeId' });
  agreement.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  agreement.hasMany(complaint, { foreignKey: 'agreementId' });
  complaint.belongsTo(agreement, { foreignKey: 'agreementId' });

  user.hasMany(transaction, { foreignKey: 'consumerId', as: 'consumerTransactions' });
  transaction.belongsTo(user, { foreignKey: 'consumerId', as: 'consumer' });

  user.hasMany(complaint, { foreignKey: 'consumerId', as: 'consumerComplaints' });
  complaint.belongsTo(user, { foreignKey: 'consumerId', as: 'consumer' });

  complaint.hasOne(audit, { foreignKey: 'complaintId' });
  audit.belongsTo(complaint, { foreignKey: 'complaintId' });

  complaint.hasOne(compensation, { foreignKey: 'complaintId' });
  compensation.belongsTo(complaint, { foreignKey: 'complaintId' });

  complaint.hasMany(mediation, { foreignKey: 'complaintId' });
  mediation.belongsTo(complaint, { foreignKey: 'complaintId' });

  user.hasMany(mediation, { foreignKey: 'mediatorId', as: 'mediatorMediations' });
  mediation.belongsTo(user, { foreignKey: 'mediatorId', as: 'mediator' });

  transaction.hasMany(complaint, { foreignKey: 'transactionId' });
  complaint.belongsTo(transaction, { foreignKey: 'transactionId' });
  
  complaint.hasOne(clarification, { foreignKey: 'complaintId' });
  clarification.belongsTo(complaint, { foreignKey: 'complaintId' });
  
  franchisor.hasOne(complaint_rule, { foreignKey: 'franchisorId' });
  complaint_rule.belongsTo(franchisor, { foreignKey: 'franchisorId' });

  franchisee.hasMany(audit_score, { foreignKey: 'franchiseeId' });
  audit_score.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  franchisee.hasMany(product, { foreignKey: 'franchiseeId' });
  product.belongsTo(franchisee, { foreignKey: 'franchiseeId' });

  product.hasMany(order, { foreignKey: 'productId' });
  order.belongsTo(product, { foreignKey: 'productId' });

  user.hasMany(order, { foreignKey: 'consumerId', as: 'consumerOrders' });
  order.belongsTo(user, { foreignKey: 'consumerId', as: 'consumer' });

  transaction.hasMany(order, { foreignKey: 'transactionId' });
  order.belongsTo(transaction, { foreignKey: 'transactionId' });

  franchisee.hasMany(complaint, { foreignKey: 'franchiseeId' });
  complaint.belongsTo(franchisee, { foreignKey: 'franchiseeId' });
  

};