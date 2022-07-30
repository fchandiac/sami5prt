'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
  };
  Prices.init({
    tax_id: DataTypes.INTEGER,
    sale: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prices',
    underscored: true,
  });
  return Prices;
};