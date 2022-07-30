'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdersDetails extends Model {
  };
  OrdersDetails.init({
    order_id : DataTypes.INTEGER,
    product_id : DataTypes.INTEGER,
    quanty: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'ordersdetails',
    underscored: true,
  });
  return OrdersDetails;
};