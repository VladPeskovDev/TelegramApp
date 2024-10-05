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
    today.setHours(0, 0, 0, 0); 

    // Получаем информацию о магазине по его ID
    const store = await Stores.findOne({
      where: { id: store_id },
      attributes: ['name'], // Получаем только имя магазина
    });

    if (!store) {
      return res.status(404).json({ message: 'Магазин не найден' });
    }

    // Ищем очередь только на текущий день и конкретный магазин по его ID
    const queue = await Queues.findOne({
      where: {
        store_id: store_id, // Ищем по переданному store_id
        date: today,        // Ищем очередь только на текущую дату
      },
    });

    if (!queue) {
      return res.status(404).json({
        message: `Очередь не найдена для магазина ${store.name} на текущую дату`,
        name: store.name, // Возвращаем название магазина
      });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        attributes: ['user_id'], // Возвращаем только ID пользователей
      });

      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries,
        queue_date: queue.date,
        name: store.name, // Используем поле name для названия магазина
      });
    } else {
      return res.status(200).json({
        message: 'Очередь закрыта',
        queue_date: queue.date,
        name: store.name, // Используем поле name для названия магазина
      });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о СИЗО:', error);
    res.status(500).json({ message: 'Ошибка получения данных' });
  }
});


/* userRouter.route('/:store_id/tomorrow').get(async (req, res) => {
  const { store_id } = req.params;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

  try {
    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: tomorrow, // Ищем очередь на завтрашний день
      },
      include: [
        {
          model: Stores,
          as: 'store',
          attributes: ['name'],
        },
      ],
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь на завтра не найдена' });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        attributes: ['user_id'],
      });

      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries,
        queue_date: queue.date,
        name: queue.store.name,
      });
    } else {
      return res.status(200).json({
        message: 'Очередь закрыта',
        queue_date: queue.date,
        name: queue.store.name,
      });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о СИЗО:', error);
    res.status(500).json({ message: 'Ошибка получения данных' });
  }
}); */


userRouter.route('/:store_id/queue/:date').get(async (req, res) => {
  const { store_id, date } = req.params;

  try {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

    // Ищем очередь для указанного магазина на конкретную дату
    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: targetDate, // Ищем очередь на указанную дату
      },
      include: [
        {
          model: Stores,
          as: 'store',
          attributes: ['name'], // Возвращаем только поле name
        },
      ],
    });

    if (!queue) {
      return res.status(404).json({ message: `Очередь не найдена для магазина ${store_id} на ${date}` });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        attributes: ['user_id'],
      });

      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries,
        queue_date: queue.date,
        name: queue.store.name,
      });
    } else {
      return res.status(200).json({
        message: 'Очередь закрыта',
        queue_date: queue.date,
        name: queue.store.name,
      });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о магазине:', error);
    res.status(500).json({ message: 'Ошибка получения данных' });
  }
});



module.exports = userRouter;
