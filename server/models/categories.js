'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
  };
  Categories.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Categories',
    underscored: true,
  });
  return Categories;
};