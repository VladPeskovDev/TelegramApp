'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Queue_entries, {
        foreignKey: 'user_id',
        as: 'queueEntries',
      });

      this.hasMany(models.Premium_notifications, {
        foreignKey: 'user_id', 
        as: 'premiumNotifications', 
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
