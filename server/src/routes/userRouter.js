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

/* userRouter.route('/:store_id').get(async (req, res) => {
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
      // Теперь мы присоединяем пользователей и их данные
      const entries = await Queue_entries.findAll({
        where: { queue_id: queue.id },
        include: [
          {
            model: User,
            as: 'user', // Используем алиас
            attributes: ['first_name', 'last_name'], // Возвращаем имя и фамилию
          },
        ],
      });

      return res.status(200).json({
        message: 'Очередь открыта',
        users: entries, // Здесь теперь будут данные пользователей
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


const first_name = 'test';
const last_name = 'test';
const temporaryTelegramId = `${first_name}_${last_name}_test`;

userRouter.route('/:store_id/queue/:date/signup').post(async (req, res) => {
  const { store_id, date } = req.params;
  const { first_name, last_name } = req.body;  // Пока мы не используем telegram_id

  try {
    // Шаг 1: Найти или создать пользователя
    let user = await User.findOne({
      where: { first_name, last_name },  // Временно используем first_name и last_name вместо telegram_id
    });

    if (!user) {
      user = await User.create({
        first_name,
        last_name,
        telegram_id: temporaryTelegramId,  // Устанавливаем null для telegram_id, т.к. его пока нет
      });
    }

    // Шаг 2: Проверить наличие очереди на указанную дату для магазина
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const queue = await Queues.findOne({
      where: {
        store_id: store_id,
        date: targetDate,
      },
    });

    if (!queue) {
      return res.status(404).json({ message: 'Очередь не найдена на указанную дату для данного магазина' });
    }

    // Шаг 3: Проверить, записан ли пользователь уже на эту дату в эту очередь
    const existingEntry = await Queue_entries.findOne({
      where: {
        user_id: user.id,
        queue_id: queue.id,
      },
    });

    if (existingEntry) {
      return res.status(400).json({ message: 'Вы уже записаны в эту очередь на указанную дату' });
    }

    // Шаг 4: Найти текущую позицию в очереди
    const currentEntriesCount = await Queue_entries.count({
      where: { queue_id: queue.id },
    });

    // Шаг 5: Добавить запись в очередь
    const newEntry = await Queue_entries.create({
      queue_id: queue.id,
      user_id: user.id,
      position: currentEntriesCount + 1,  // Назначаем позицию в очереди
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




module.exports = userRouter;
