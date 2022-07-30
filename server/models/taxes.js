'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Taxes extends Model {
  };
  Taxes.init({
    name: DataTypes.STRING,
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Taxes',
    underscored: true,
  });
  return Taxes;
};