'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    franchiseeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'products'
  });

  Product.associate = function(models) {
    
  };

  return Product;
};
