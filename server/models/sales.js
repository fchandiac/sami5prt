'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
  };
  Sales.init({
    amount : DataTypes.INTEGER,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sales',
    underscored: true,
  });
  return Sales;
};