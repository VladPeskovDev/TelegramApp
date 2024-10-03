const { Queue_entries, Queues, Stores, User } = require('../../db/models'); 
const userRouter = require('express').Router();
const { Op } = require('sequelize');


/* userRouter.route('/').post(async (req, res) => {
  try {
    const { telegram_id, store_id, date, first_name, last_name } = req.body;

    // Проверяем, существует ли пользователь
    let user = await User.findOne({ where: { telegram_id } });
    if (!user) {
      // Если пользователя нет, создаем нового
      user = await User.create({ telegram_id, first_name, last_name, is_premium: false });
    }

    // Проверяем, существует ли очередь на указанную дату
    const queue = await Queues.findOne({ where: { store_id, date, opened_at: { [Op.ne]: null } } });
    if (!queue) {
      return res.status(400).json({ message: 'Очередь на эту дату еще не открыта' });
    }

    // Проверяем, не записан ли пользователь уже на эту дату в этот магазин
    const existingEntry = await Queue_entries.findOne({ where: { user_id: user.id, queue_id: queue.id } });
    if (existingEntry) {
      return res.status(400).json({ message: 'Вы уже записаны в эту очередь' });
    }

    // Определяем позицию в очереди
    const position = await Queue_entries.count({ where: { queue_id: queue.id } }) + 1;

    // Записываем пользователя в очередь
    await Queue_entries.create({ user_id: user.id, queue_id: queue.id, position });

    res.status(200).json({ message: 'Вы успешно записаны в очередь', position });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при записи в очередь' });
  }
});
*/



userRouter.route('/:store_id').get(async (req, res) => {
  const { store_id } = req.params;

  try {
    // Получаем текущую дату
    const today = new Date();
    
    
    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: {
          [Op.gte]: today, // Очередь на будущее
        },
      },
      order: [['date', 'ASC']],
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена' });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      // Если открыта, возвращаем список записанных пользователей
      const entries = await Queue_entries.findAll({ where: { queue_id: queue.id } });
      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries,
        queue_date: queue.date,
      });
    } else {
      return res.status(200).json({ message: 'Очередь закрыта', queue_date: queue.date });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получения статуса очереди' });
  }
});

/*  userRouter.route('/:store_id/today').get(async (req, res) => {
  const { store_id } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: today,
      },
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь на сегодня не найдена' });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({ where: { queue_id: queue.id } });
      return res.status(200).json({
        message: 'Очередь на сегодня открыта',
        users: entries,
        queue_date: queue.date,
      });
    } else {
      return res.status(200).json({ message: 'Очередь на сегодня закрыта', queue_date: queue.date });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получения статуса очереди на сегодня' });
  }
});

userRouter.route('/:store_id/tomorrow').get(async (req, res) => {
  const { store_id } = req.params;

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: tomorrow,
      },
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь на завтра не найдена' });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({ where: { queue_id: queue.id } });
      return res.status(200).json({
        message: 'Очередь на завтра открыта',
        users: entries,
        queue_date: queue.date,
      });
    } else {
      return res.status(200).json({ message: 'Очередь на завтра закрыта', queue_date: queue.date });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получения статуса очереди на завтра' });
  }
});
 */



module.exports = userRouter;
