'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
  };
  Orders.init({
    state: DataTypes.BOOLEAN,
    table: DataTypes.INTEGER,
    printed: DataTypes.BOOLEAN,
    delivery:DataTypes.BOOLEAN,
    note:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
    underscored: true,
  });
  return Orders;
};