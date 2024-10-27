/* const { Queues, Stores } = require('../../db/models');

async function openQueuesForAllStores() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // День недели (0 - воскресенье, 6 - суббота)

  let dateToOpen = new Date(today);
  dateToOpen.setDate(today.getDate() + 1); // Генерация на следующий день
  dateToOpen.setHours(0, 0, 0, 0);

  // Определяем время открытия очереди
  let openTime;
  if (dayOfWeek === 5 || dayOfWeek === 6) { // Пятница или Суббота
    // Устанавливаем "фиктивное" время 23:59
    openTime = new Date(today);
    openTime.setHours(23, 59, 0, 0); // Очередь не откроется фактически
    console.log(`Фиктивная очередь на ${dateToOpen.toDateString()} с фиктивным временем открытия 23:59`);
  } else {
    // Генерация времени открытия на будние дни между 18:00 и 23:59
    const randomHour = Math.floor(Math.random() * (23 - 18 + 1)) + 18;
    const randomMinute = Math.floor(Math.random() * 60);
    openTime = new Date(today);
    openTime.setHours(randomHour, randomMinute, 0, 0);

    console.log(`Очередь на ${dateToOpen.toDateString()} с временем открытия: ${openTime.toTimeString()}`);
  }

  try {
    const stores = await Stores.findAll();
    if (stores.length === 0) {
      console.log('Магазины не найдены.');
      return;
    }

    for (const store of stores) {
      try {
        await Queues.create({
          store_id: store.id,
          date: dateToOpen, // Дата очереди
          opened_at: openTime, // Время открытия или фиктивное время
          createdAt: new Date(),
          updatedAt: new Date()
        });

        console.log(`Очередь создана для магазина с ID ${store.id} на дату ${dateToOpen.toDateString()} с открытием в ${openTime.toTimeString()}`);
      } catch (error) {
        console.error(`Ошибка при создании очереди для магазина с ID ${store.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Ошибка при получении списка магазинов:', error);
  }
}

module.exports = { openQueuesForAllStores }; */

const { Queues, Stores } = require('../../db/models');

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

  //const randomHour = Math.floor(Math.random() * (23 - 18 + 1)) + 18;
  const randomHour = Math.floor(Math.random() * (20 - 14 + 1)) + 14;
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