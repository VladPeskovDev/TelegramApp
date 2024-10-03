//const cron = require('node-cron');
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

    // Удаляем записи очередей на текущий день
    const deletedQueues = await Queues.destroy({
      where: {
        date: today
      }
    });
    console.log(`${deletedQueues} очереди были удалены для даты ${today.toDateString()}`);

    // Удаляем старые записи времени открытия из таблицы Queues
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Получаем дату вчерашнего дня
    const deletedOldQueues = await Queues.destroy({
      where: {
        date: yesterday, // Удаляем очереди для вчерашнего дня
        opened_at: {
          [Op.ne]: null // Только те очереди, которые уже были открыты
        }
      }
    });
    console.log(`Удалено ${deletedOldQueues} старых очередей для даты ${yesterday.toDateString()}`);
  } catch (error) {
    console.error('Ошибка при удалении данных очередей и записей:', error);
  }
}

//cron.schedule('58 23 * * *', deleteQueuesAndEntriesForToday);

module.exports = { deleteQueuesAndEntriesForToday };

