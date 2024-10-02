const cron = require('node-cron');
const { Queues, Queue_entries } = require('../../db/models');
const { Op, Sequelize } = require('sequelize'); 


async function deleteQueuesAndEntriesForToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

  try {
    // Удаляем записи в queue_entries, связанные с очередями на текущий день
    const deletedEntries = await Queue_entries.destroy({
      where: {
        queue_id: {
          [Op.in]: Sequelize.literal(`(SELECT id FROM "Queues" WHERE date = '${today.toISOString().split('T')[0]}')`) // Оборачиваем SELECT в скобки
        }
      }
    });
    console.log(`${deletedEntries} записей пользователей были удалены для даты ${today.toDateString()}`);

    
    const deletedQueues = await Queues.destroy({
      where: {
        date: today
      }
    });
    console.log(`${deletedQueues} очереди были удалены для даты ${today.toDateString()}`);
  } catch (error) {
    console.error('Ошибка при удалении данных очередей и записей:', error);
  }
}


cron.schedule('01 23 * * *', deleteQueuesAndEntriesForToday);


module.exports = { deleteQueuesAndEntriesForToday };
