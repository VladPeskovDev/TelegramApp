const { Queue_entries, Queues, Stores, User } = require('../../db/models');
const userRouter = require('express').Router();
require('dotenv').config();

userRouter.route('/').get(async (req, res) => {
  try {
    const stores = await Stores.findAll();
    res.status(200).json(stores);
  } catch (error) {
    console.error('Ошибка при получении магазинов:', error);
    res.status(500).json({ message: 'Ошибка при получении магазинов' });
  }
});

userRouter.route('/:store_id/queue/:date').get(async (req, res) => {
  const { store_id, date } = req.params;

  try {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: targetDate,
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
      return res
        .status(404)
        .json({ message: `Очередь не найдена для магазина ${store_id} на ${date}` });
    }

    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    if (isOpen) {
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['first_name', 'last_name'],
          },
        ],
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

userRouter.route('/:store_id/queue/:date/signup').post(async (req, res) => {
  const { store_id, date } = req.params;
  const { first_name, last_name, telegram_id } = req.body;

  try {
    if (!telegram_id || !first_name || !last_name) {
      return res
        .status(400)
        .json({ message: 'Необходимо предоставить telegram_id, first_name и last_name' });
    }

    const cleanFirstName = first_name.trim();
    const cleanLastName = last_name.trim();

    let user = await User.findOne({
      where: { telegram_id },
    });

    if (!user) {
      user = await User.create({
        first_name: cleanFirstName,
        last_name: cleanLastName,
        telegram_id,
      });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: targetDate,
      },
    });

    if (!queue) {
      return res
        .status(404)
        .json({ message: 'Очередь не найдена на указанную дату для данного магазина' });
    }

    const now = new Date();
    if (!queue.opened_at || now < new Date(queue.opened_at)) {
      return res.status(403).json({ message: 'Очередь еще не открыта для записи' });
    }

    const existingEntry = await Queue_entries.findOne({
      where: {
        user_id: user.id,
        queue_id: queue.id,
      },
    });

    if (existingEntry) {
      return res.status(400).json({ message: 'Вы уже записаны в эту очередь на указанную дату' });
    }

    if (user.first_name !== cleanFirstName || user.last_name !== cleanLastName) {
      user.first_name = cleanFirstName;
      user.last_name = cleanLastName;
      await user.save();
    }

    const currentEntriesCount = await Queue_entries.count({
      where: { queue_id: queue.id },
    });

    const newEntry = await Queue_entries.create({
      queue_id: queue.id,
      user_id: user.id,
      position: currentEntriesCount + 1,
    });

    res.status(201).json({
      message: 'Вы успешно записаны в очередь',
      queueEntry: newEntry,
    });
  } catch (error) {
    console.error('Ошибка записи в очередь:', error);
    res.status(500).json({ message: 'Ошибка записи в очередь' });
  }
});

userRouter.route('/:store_id/queue/:date/delete').delete(async (req, res) => {
  const { store_id, date } = req.params;
  const { telegram_id } = req.body;
  
  try {
    const user = await User.findOne({
      where: { telegram_id },
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: targetDate,
      },
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена для указанной даты и магазина' });
    }

    const queueEntry = await Queue_entries.findOne({
      where: {
        user_id: user.id,
        queue_id: queue.id,
      },
    });

    if (!queueEntry) {
      return res.status(404).json({ message: 'Запись не найдена в очереди' });
    }

    await queueEntry.destroy();
    res.status(200).json({ message: 'Запись успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
    res.status(500).json({ message: 'Ошибка при удалении записи' });
  }
});

module.exports = userRouter;
