'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
  };
  Products.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    category_id : DataTypes.INTEGER,
    price_id : DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
    ticket: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Products',
    underscored: true,
  });
  return Products;
};