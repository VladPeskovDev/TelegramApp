const { Queue_entries, Queues, Stores, User } = require('../../db/models'); 
const userRouter = require('express').Router();
const { Op } = require('sequelize');


userRouter.route('/').get(async (req, res) => {
  try {
    const stores = await Stores.findAll();
    res.status(200).json(stores);
  } catch (error) {
    console.error('Ошибка при получении магазинов:', error);
    res.status(500).json({ message: 'Ошибка при получении магазинов' });
  }
});



userRouter.route('/:store_id').get(async (req, res) => {
  const { store_id } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

    // Получаем ближайшую очередь для данного магазина
    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: {
          [Op.gte]: today, // Ищем очередь на текущий или будущие дни
        },
      },
      include: [
        {
          model: Stores, // Присоединяем таблицу магазинов
          as: 'store',   // Указываем алиас связи
          attributes: ['name'], // Возвращаем только поле name
        },
      ],
      order: [['date', 'ASC']],
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена для данного СИЗО' });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        attributes: ['user_id'], // Можно вернуть только ID пользователей
      });

      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries,
        queue_date: queue.date,
        name: queue.store.name, // Используем поле name для названия магазина
      });
    } else {
      return res.status(200).json({
        message: 'Очередь закрыта',
        queue_date: queue.date,
        name: queue.store.name, // Используем поле name для названия магазина
      });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о СИЗО:', error);
    res.status(500).json({ message: 'Ошибка получения данных' });
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
