const { Queues, Stores } = require('../../db/models');

async function openQueuesForAllStores() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // День недели

  
  let dateToOpen;

  if (dayOfWeek === 5 || dayOfWeek === 6) { 
    console.log('В пятницу и субботу очередь не генерируется, магазины закрыты.');
    return; 
  } else if (dayOfWeek === 0) { // Воскресенье
    dateToOpen = new Date(today);
    dateToOpen.setDate(today.getDate() + 1); // Генерируем на понедельник
  } else { 
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


/*
const { Queues, Stores } = require('../../db/models');

async function openQueuesForAllStores() {
  const today = new Date();
  const tomorrow = new Date(today);

  // Устанавливаем дату завтрашнего дня для генерации очереди
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Обнуляем время

  // Генерация случайного времени открытия очереди (например, 14:00 - 20:00)
  const randomHour = Math.floor(Math.random() * (20 - 14 + 1)) + 14;
  const randomMinute = Math.floor(Math.random() * 60);
  const openTime = new Date(today); // Время открытия — сегодня
  openTime.setHours(randomHour, randomMinute, 0, 0);

  console.log(`Очередь будет сгенерирована для даты: ${tomorrow.toDateString()} с временем открытия: ${openTime.toTimeString()} (сегодня)`);

  try {
    const stores = await Stores.findAll();

    if (stores.length === 0) {
      console.log('Магазины не найдены.');
      return;
    }

    for (const store of stores) {
      try {
        // Проверяем, существует ли уже очередь на завтрашний день
        const existingQueue = await Queues.findOne({
          where: { store_id: store.id, date: tomorrow },
        });

        if (existingQueue) {
          console.log(`Очередь для магазина с ID ${store.id} на дату ${tomorrow.toDateString()} уже существует.`);
          continue;
        }

        // Создаём новую очередь
        await Queues.create({
          store_id: store.id,
          date: tomorrow, // Очередь на завтра
          opened_at: openTime, // Открывается сегодня
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log(`Очередь создана для магазина с ID ${store.id} на дату: ${tomorrow.toDateString()} с временем открытия: ${openTime.toTimeString()}`);
      } catch (error) {
        console.error(`Ошибка при создании очереди для магазина с ID ${store.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Ошибка при получении списка магазинов:', error);
  }
}

module.exports = { openQueuesForAllStores }; */
