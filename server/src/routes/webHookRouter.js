const {  User } = require('../../db/models');
const webHookRouter = require('express').Router();
require('dotenv').config();
const bot = require('../bot');



webHookRouter.route('/webhook').post(async (req, res) => {
    console.log('Webhook body:', req.body);
    const { message } = req.body;
  
    if (message && message.chat && message.chat.id) {
      const chatId = String(message.chat.id);
      console.log(`Telegram ID: ${chatId}`);
  
      try {
        const [user, created] = await User.findOrCreate({
          where: { telegram_id: chatId },
          defaults: { telegram_id: chatId },
        });
  
        // Отправка сообщения через бота
        if (created) {
          bot.sendMessage(chatId, 'Вы успешно зарегистрированы!');
        } else {
          bot.sendMessage(chatId, 'Добро пожаловать обратно!');
        }
  
        res.sendStatus(200);
      } catch (error) {
        console.error('Ошибка при обработке webhook:', error);
        res.sendStatus(500);
      }
    } else {
      console.log('Некорректный запрос');
      res.sendStatus(400);
    }
  });

  module.exports = webHookRouter;