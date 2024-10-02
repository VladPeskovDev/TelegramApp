const { Queue_entries, Queues, Stores, User } = require('./models'); // Импорты моделей
const userRouter = require('express').Router();


userRouter.route('/').post(async (req, res) => {
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

module.exports = userRouter;