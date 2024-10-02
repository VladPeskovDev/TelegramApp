const cron = require('node-cron');
const { Queues, Stores } = require('../../db/models');
const { Op } = require('sequelize');

// Функция для создания и открытия очередей во всех магазинах
async function openQueuesForAllStores() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayOfWeek = today.getDay(); // День недели

  // Определяем день, на который нужно создать очередь (послезавтра)
  let dateToOpen;
  if (dayOfWeek === 5) { // Суббота
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 2); // Создаём на понедельник
  } else if (dayOfWeek === 6) { // Воскресенье
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 2); // Создаём на вторник
  } else {
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 2); // Создаём на послезавтра
  }

  // Обнуляем время для корректного хранения даты
  dateToOpen.setHours(0, 0, 0, 0);

  // Проверяем, не выпадает ли дата на субботу или воскресенье
  const dateToOpenDayOfWeek = dateToOpen.getDay();
  if (dateToOpenDayOfWeek === 6 || dateToOpenDayOfWeek === 0) {
    console.log(`Очереди на ${dateToOpen.toDateString()} не будут созданы, так как это выходной.`);
    return;
  }

  // Генерируем случайное время для открытия очередей (с 00:00 до 21:00)
  const randomHour = Math.floor(Math.random() * 21);
  const randomMinute = Math.floor(Math.random() * 60);
  const openTime = new Date(today);
  openTime.setHours(randomHour, randomMinute, 0, 0);

  console.log(`Генерация времени открытия очередей: ${openTime.toTimeString()} для даты ${dateToOpen.toDateString()}`);

  // Получаем список всех магазинов
  try {
    const stores = await Stores.findAll();
    
    if (stores.length === 0) {
      console.log('Магазины не найдены.');
      return;
    }

    // Для каждого магазина создаём запись с одинаковым временем открытия
    for (const store of stores) {
      try {
        await Queues.create({
          store_id: store.id,
          date: dateToOpen,
          opened_at: openTime,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        console.log(`Запись создана для магазина с ID ${store.id} и датой: ${dateToOpen.toDateString()} с временем открытия: ${openTime.toTimeString()}`);
      } catch (error) {
        console.error(`Ошибка при создании записи для магазина с ID ${store.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Ошибка при получении списка магазинов:', error);
  }
}

// Планируем задачу cron на каждый день в 20:19
cron.schedule('24 20 * * *', openQueuesForAllStores);

// Экспорт функции
module.exports = { openQueuesForAllStores };

