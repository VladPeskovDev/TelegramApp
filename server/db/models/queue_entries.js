'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Queue_entries extends Model {
    static associate(models) {
      // Связь с таблицей users
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      // Связь с таблицей queues
      this.belongsTo(models.Queues, {
        foreignKey: 'queue_id',
        as: 'queue',
      });
    }
  }

  Queue_entries.init({
    queue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Queue_entries',
  });

  return Queue_entries;
};
