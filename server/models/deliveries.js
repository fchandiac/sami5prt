

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Deliveries extends Model {
  };
  Deliveries.init({
    order_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    transfer: DataTypes.BOOLEAN,
    address: DataTypes.STRING

  
  }, {
    sequelize,
    modelName: 'deliveries',
    underscored: true,
  });
  return Deliveries;
};






