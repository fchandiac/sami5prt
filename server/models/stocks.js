
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
  };
  Stocks.init({
    product_id : DataTypes.INTEGER,
    room : DataTypes.INTEGER,
    warehouse: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Stocks',
    underscored: true,
  });
  return Stocks;
};


