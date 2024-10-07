const TelegramBot = require('node-telegram-bot-api');
const { User } = require('../db/models');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = String(msg.chat.id);  // Преобразуем chatId в строку

  try {
    // Автоматически создаем запись, если пользователь не существует
    const [user, created] = await User.findOrCreate({
      where: { telegram_id: chatId },  // Telegram ID теперь строка
      defaults: {
        telegram_id: chatId,  // Telegram ID пользователя
      },
    });

    if (created) {
      // Сообщение для нового пользователя
      bot.sendMessage(chatId, 'Вы успешно зарегистрированы! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Открыть сайт',
                web_app: {
                  url: 'https://221f-95-164-12-129.ngrok-free.app',  // Укажите URL вашего сайта
                },
              },
            ],
          ],
        },
      });
    } else {
      // Сообщение для уже существующего пользователя
      bot.sendMessage(chatId, 'Добро пожаловать обратно! Нажмите на кнопку, чтобы открыть сайт', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Открыть сайт',
                web_app: {
                  url: 'https://221f-95-164-12-129.ngrok-free.app',  // Укажите URL вашего сайта
                },
              },
            ],
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
