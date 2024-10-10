const TelegramBot = require('node-telegram-bot-api');
const { User } = require('../db/models');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Начать взаимодействие с ботом' },
  { command: '/info', description: 'Получить информацию о боте' },
  { command: '/help', description: 'Помощь по использованию бота' },
]);

bot.onText(/\/start/, async (msg) => {
  const chatId = String(msg.chat.id);  

  try {
    const [user, created] = await User.findOrCreate({
      where: { telegram_id: chatId },
      defaults: { telegram_id: chatId },
    });

    
    const url = `https://c601-95-164-12-129.ngrok-free.app?telegram_id=${chatId}`;

    if (created) {
      bot.sendMessage(chatId, 'Вы успешно зарегистрированы! Нажмите на кнопку, чтобы записаться в сизо', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Записаться в сизо', web_app: { url } }]
          ],
        },
      });
    } else {
      bot.sendMessage(chatId, 'Добро пожаловать обратно! Нажмите на кнопку, чтобы записаться в сизо', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Записаться в сизо', web_app: { url } }]
          ],
        },
      });
    }
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    bot.sendMessage(chatId, 'Произошла ошибка на сервере, попробуйте позже.');
  }
});

bot.onText(/\/info/, (msg) => {
  const chatId = String(msg.chat.id);

  const infoMessage = `
    Добро пожаловать в бота записи в СИЗО!

Этот бот создан энтузиастами, которым надоело ездить в СИЗО по ночам или рано утром, чтобы просто записаться на мятом листочке.
Нам надоело, что этот мятый листочек постоянно рвут, и на утро выясняется, что существует несколько версий очереди.
Нам надоело, что для того, чтобы попасть в СИЗО, этот самый листочек нужно всю ночь охранять.
Мы решили создать единый источник правды, который невозможно порвать, к которому не нужно ехать, чтобы записаться, и который не нужно охранять.
Пользуясь этим ботом, вы всегда сможете оценить наличие уже сформировавшейся очереди и здраво оценить свои шансы на попадание в СИЗО, не приезжая в поисках того самого листочка.
  `;

  bot.sendMessage(chatId, infoMessage);
});

bot.onText(/\/help/, (msg) => {
  const chatId = String(msg.chat.id);

  const infoMessage = `
    Добро пожаловать в бота записи в СИЗО! 

    Этот бот позволяет вам:
    - Записаться на посещение СИЗО.
    - Проверить статус вашей записи.
    - Получать уведомления о статусе очереди.

    Для записи нажмите на кнопку "Записаться в СИЗО" и следуйте инструкциям. 

    Если у вас есть вопросы, свяжитесь с администрацией.
  `;

  bot.sendMessage(chatId, infoMessage);
});

//ngrok http 5173


module.exports = bot; 