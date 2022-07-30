'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class SalesDetails extends Model {
  };
  SalesDetails.init({
    sale_id : DataTypes.INTEGER,
    price_id : DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    quanty: DataTypes.FLOAT,
    subtotal: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'salesdetails',
    underscored: true,
  });
  return SalesDetails;
};
