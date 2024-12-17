const { Queue_entries, Queues, Stores, User } = require('../../db/models');
const userRouter = require('express').Router();
const NodeCache = require('node-cache');
require('dotenv').config();

const cacheShop = new NodeCache({ stdTTL: 86400, checkperiod: 14400 });
const cache = new NodeCache({ stdTTL: 600, checkperiod: 300 });


userRouter.route('/').get(async (req, res) => {
  try {
    const cachedStores = cacheShop.get('stores');
    if (cachedStores) {
      return res.status(200).json(cachedStores);
    }
    const stores = await Stores.findAll();
    cacheShop.set('stores', stores);
    res.status(200).json(stores);
  } catch (error) {
    console.error('Ошибка при получении магазинов:', error);
    res.status(500).json({ message: 'Ошибка при получении магазинов' });
  }
});

// Получение очереди по магазину и дате
userRouter.route('/:store_id/queue/:date').get(async (req, res) => {
  const { store_id, date } = req.params;
  const cacheKey = `queue_${store_id}_${date}`;

  try {
    const cachedQueue = cache.get(cacheKey);
    if (cachedQueue) {
      return res.status(200).json(cachedQueue);
    }
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: { store_id, date: targetDate },
      include: [
        {
          model: Stores,
          as: 'store',
          attributes: ['name'],
        },
      ],
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена' });
    }
    const isOpen = queue.opened_at && new Date() >= new Date(queue.opened_at);

    let response = {
      message: isOpen ? 'Очередь открыта' : 'Очередь закрыта',
      queue_date: queue.date,
      name: queue.store.name,
      users: [],
    };

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
        order: [['position', 'ASC']], // Добавлена сортировка
      });
      response.users = entries.map((entry) => ({
        id: entry.id,
        queue_id: entry.queue_id,
        user_id: entry.user_id,
        position: entry.position,
        is_checked_in: entry.is_checked_in,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        user: {
          first_name: entry.user?.first_name || 'Имя отсутствует',
          last_name: entry.user?.last_name || 'Фамилия отсутствует',
        },
      }));
    }
    

    cache.set(cacheKey, response);
    res.status(200).json(response);
  } catch (error) {
    console.error(`Ошибка при обработке запроса для ключа ${cacheKey}:`, error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Запись в очередь
userRouter.route('/:store_id/queue/:date/signup').post(async (req, res) => {
  const { store_id, date } = req.params;
  const { first_name, last_name, telegram_id } = req.body;
  const cacheKey = `queue_${store_id}_${date}`;

  try {
    if (!telegram_id || !first_name || !last_name) {
      return res.status(400).json({ message: 'Недостаточно данных для записи' });
    }
    const cleanFirstName = first_name.trim();
    const cleanLastName = last_name.trim();

    // Поиск или создание пользователя
    const [user, created] = await User.findOrCreate({
      where: { telegram_id },
      defaults: { first_name: cleanFirstName, last_name: cleanLastName },
    });

    if (!created) {
      let hasChanges = false;

      if (user.first_name !== cleanFirstName) {
        user.first_name = cleanFirstName;
        hasChanges = true;
      }
      if (user.last_name !== cleanLastName) {
        user.last_name = cleanLastName;
        hasChanges = true;
      }
      if (hasChanges) {
        await user.save();
      }
    }
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({ where: { store_id, date: targetDate } });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена' });
    }
    const now = new Date();
    if (!queue.opened_at || now < new Date(queue.opened_at)) {
      return res.status(403).json({ message: 'Очередь ещё не открыта' });
    }
    const existingEntry = await Queue_entries.findOne({
      where: { user_id: user.id, queue_id: queue.id },
    });
    if (existingEntry) {
      return res.status(400).json({ message: 'Вы уже записаны в очередь' });
    }
    const currentCount = await Queue_entries.count({ where: { queue_id: queue.id } });

    const newEntry = await Queue_entries.create({
      queue_id: queue.id,
      user_id: user.id,
      position: currentCount + 1,
    });

    // Удаление устаревшего кэша
    if (cache.has(cacheKey)) {
      cache.del(cacheKey);
    }

    res.status(201).json({
      message: 'Вы успешно записаны в очередь',
      queueEntry: newEntry,
    });
  } catch (error) {
    console.error('Ошибка записи в очередь:', error);
    res.status(500).json({ message: 'Ошибка записи в очередь' });
  }
});

// Удаление записи из очереди
userRouter.route('/:store_id/queue/:date/delete').delete(async (req, res) => {
  const { store_id, date } = req.params;
  const { telegram_id } = req.body;
  const cacheKey = `queue_${store_id}_${date}`;

  try {
    const user = await User.findOne({ where: { telegram_id } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: { store_id: store_id, date: targetDate },
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена для указанной даты и магазина' });
    }

    const queueEntry = await Queue_entries.findOne({
      where: { user_id: user.id, queue_id: queue.id },
    });

    if (!queueEntry) {
      return res.status(404).json({ message: 'Запись не найдена в очереди' });
    }

    await queueEntry.destroy();
    cache.del(cacheKey); 
    res.status(200).json({ message: 'Запись успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
    res.status(500).json({ message: 'Ошибка при удалении записи' });
  }
});

module.exports = userRouter;
