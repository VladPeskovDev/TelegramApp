const TelegramBot = require('node-telegram-bot-api');
const { User } = require('../db/models');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = String(msg.chat.id);  

  try {
    const [user, created] = await User.findOrCreate({
      where: { telegram_id: chatId },
      defaults: { telegram_id: chatId },
    });

    // Формирование уникальной ссылки для этого пользователя
    const url = `https://1734-95-164-12-129.ngrok-free.app?telegram_id=${chatId}`;

    if (created) {
      bot.sendMessage(chatId, 'Вы успешно зарегистрированы! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Открыть сайт', web_app: { url } }]
          ],
        },
      });
    } else {
      bot.sendMessage(chatId, 'Добро пожаловать обратно! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Открыть сайт', web_app: { url } }]
          ],
        },
      });
    }
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    bot.sendMessage(chatId, 'Произошла ошибка на сервере, попробуйте позже.');
  }
});


//ngrok http 5173

/* const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Инициализация бота через webhook
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { webHook: true });

// Установка Webhook URL, на который Telegram будет отправлять запросы
const webHookUrl = `${process.env.SERVER_URL}/webhook`;  // Используйте публичный URL вашего сервера
telegramBot.setWebHook(webHookUrl);

// Обработка команды /start
telegramBot.onText(/\/start/, async (msg) => {
  const chatId = String(msg.chat.id);
  console.log(`Команда /start получена от Telegram chat ID: ${chatId}`);

  // Отправка сообщения с кнопкой для открытия веб-приложения
  telegramBot.sendMessage(chatId, 'Добро пожаловать! Нажмите на кнопку ниже, чтобы открыть приложение.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть приложение',
            web_app: {
              url: 'https://75fc-95-164-12-129.ngrok-free.app',  // Укажите URL вашего сайта или приложения
            },
          },
        ],
      ],
    },
  });
});

// Обработка других текстовых сообщений
telegramBot.on('message', async (msg) => {
  const chatId = String(msg.chat.id);
  console.log(`Получено сообщение от Telegram chat ID: ${chatId}`);

  // Логика обработки других сообщений
});

module.exports = telegramBot; */

/*const TelegramBot = require('node-telegram-bot-api');
const { User } = require('../db/models');
require('dotenv').config();

// Инициализация бота через webhook
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { webHook: true });

// Установка Webhook URL
const webHookUrl = 'https://9a31-95-164-12-129.ngrok-free.app/webhook';  // Используйте публичный URL вашего сервера
bot.setWebHook(webHookUrl);

bot.onText(/\/start/, async (msg) => {
  const chatId = String(msg.chat.id);  // Преобразуем chatId в строку
  console.log(`Команда /start получена от Telegram chat ID: ${chatId}`);

  try {
    // Автоматически создаем запись, если пользователь не существует
    const [user, created] = await User.findOrCreate({
      where: { telegram_id: chatId },  // Telegram ID теперь строка
      defaults: {
        telegram_id: chatId,  // Telegram ID пользователя
      },
    });

    if (created) {
      // Новый пользователь зарегистрирован
      console.log(`Новый пользователь зарегистрирован с ID: ${chatId}`);
      // Отправляем сообщение с кнопкой
      bot.sendMessage(chatId, 'Вы успешно зарегистрированы! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: 'Открыть сайт',
                web_app: {
                  url: 'https://9a31-95-164-12-129.ngrok-free.app',  // Укажите URL вашего сайта
                },
              },
            ],
          ],
        }),
      });
    } else {
      // Пользователь уже существует
      console.log(`Пользователь с ID: ${chatId} уже существует`);
      // Отправляем сообщение с кнопкой
      bot.sendMessage(chatId, 'Добро пожаловать обратно! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: 'Открыть сайт',
                web_app: {
                  url: 'https://9a31-95-164-12-129.ngrok-free.app',  // Укажите URL вашего сайта
                },
              },
            ],
          ],
        }),
      });
    }
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    // Отправляем сообщение об ошибке
    bot.sendMessage(chatId, 'Произошла ошибка на сервере, попробуйте позже.');
  }
});

// Экспортируем объект бота для использования в других частях приложения
module.exports = bot; */