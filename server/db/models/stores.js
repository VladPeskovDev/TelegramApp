'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    static associate(models) {
      this.hasMany(models.Queues, {
        foreignKey: 'store_id', 
        as: 'queues', 
      });
    }
  }
  
  Stores.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Stores',
  });
  
  return Stores;
};
