'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    transactionId: DataTypes.INTEGER,
    consumerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    tableName: 'orders'
  });

  Order.associate = function(models) {
    // associations can be defined here
  };

  return Order;
};
