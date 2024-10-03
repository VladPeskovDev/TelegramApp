//const cron = require('node-cron');
const { Queues, Stores } = require('../../db/models');
//const { Op } = require('sequelize');


async function openQueuesForAllStores() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // День недели

  
  let dateToOpen;

  if (dayOfWeek === 5 || dayOfWeek === 6) { // Пятница или Суббота
    console.log('В пятницу и субботу очередь не генерируется, магазины закрыты.');
    return; 
  } else if (dayOfWeek === 0) { // Воскресенье
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 1); // Генерируем на понедельник
  } else { // С понедельника по четверг
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 1); // Генерация на следующий рабочий день
  }

  
  dateToOpen.setHours(0, 0, 0, 0);

  const randomHour = Math.floor(Math.random() * (23 - 8 + 1)) + 8;
  const randomMinute = Math.floor(Math.random() * 60);
  const openTime = new Date(today);
  openTime.setHours(randomHour, randomMinute, 0, 0);

  console.log(`Генерация времени открытия очередей: ${openTime.toTimeString()} для даты ${dateToOpen.toDateString()}`);

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






module.exports = { openQueuesForAllStores };
