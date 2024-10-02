'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    static associate(models) {
      // Определяем связь с таблицей queues
      this.hasMany(models.Queues, {
        foreignKey: 'store_id', // Внешний ключ в таблице queues
        as: 'queues', // Алиас для обращения к очередям магазина
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
