const { Queues, Queue_entries } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');

async function deleteOldQueuesAndEntries() {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - 7); // Определяем дату 7 дней назад
  targetDate.setHours(0, 0, 0, 0); 

  try {
    // Удаляем записи пользователей в queue_entries, связанные с очередями на 7 дней назад
    const deletedEntries = await Queue_entries.destroy({
      where: {
        queue_id: {
          [Op.in]: Sequelize.literal(`(SELECT id FROM "Queues" WHERE date = '${targetDate.toISOString().split('T')[0]}')`)
        }
      }
    });
    console.log(`${deletedEntries} записей пользователей были удалены для даты ${targetDate.toDateString()}`);

    // Удаляем сами очереди на 7 дней назад
    const deletedQueues = await Queues.destroy({
      where: {
        date: targetDate
      }
    });
    console.log(`${deletedQueues} очередей были удалены для даты ${targetDate.toDateString()}`);
  } catch (error) {
    console.error('Ошибка при удалении старых данных очередей и записей:', error);
  }
}


module.exports = { deleteOldQueuesAndEntries };

