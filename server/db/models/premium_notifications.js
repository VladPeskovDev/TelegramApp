'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Premium_notifications extends Model {
    static associate(models) {
      // Связь с таблицей users
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      // Связь с таблицей stores
      this.belongsTo(models.Stores, {
        foreignKey: 'store_id',
        as: 'store',
      });
    }
  }

  Premium_notifications.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notification_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Premium_notifications',
  });

  return Premium_notifications;
};
