'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Связь с таблицей queue_entries
      this.hasMany(models.Queue_entries, {
        foreignKey: 'user_id',
        as: 'queueEntries',
      });

      // Связь с таблицей premium_notifications
      this.hasMany(models.Premium_notifications, {
        foreignKey: 'user_id', // Внешний ключ в таблице premium_notifications
        as: 'premiumNotifications', // Алиас для удобного обращения к уведомлениям пользователя
      });
    }
  }

  User.init({
    telegram_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    is_premium: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
