'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Queues extends Model {
    static associate(models) {
      // Связь с таблицей stores
      this.belongsTo(models.Stores, {
        foreignKey: 'store_id',
        as: 'store',
      });

      // Связь с таблицей queue_entries
      this.hasMany(models.Queue_entries, {
        foreignKey: 'queue_id', // Внешний ключ в таблице queue_entries
        as: 'queueEntries', // Алиас для обращения к записям в очереди
      });
    }
  }

  Queues.init({
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    opened_at: {
      type: DataTypes.DATE,
      allowNull: true, // Может быть null, если очередь еще не открылась
    },
  }, {
    sequelize,
    modelName: 'Queues',
  });

  return Queues;
};
