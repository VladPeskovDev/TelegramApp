const { Queues, Stores } = require('../../db/models');

async function openQueuesForAllStores() {
  const today = new Date();
  

  let dateToOpen = new Date(today);
  dateToOpen.setDate(today.getDate() ); // Всегда генерируем на следующий день

  
  dateToOpen.setHours(0, 0, 0, 0);

  
  const randomHour = Math.floor(Math.random() * (23 - 18 + 1)) + 18;
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
