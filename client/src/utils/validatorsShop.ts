import {  z } from 'zod';

export const ShopSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    queue_date: z.string().nullable().optional(), // Дата очереди может быть null, если очередь не назначена
    opened_at: z.string().nullable().optional(),  // Время открытия очереди
    users: z.array(z.any()).optional(), // Массив пользователей, сейчас пустой, но может быть массив объектов или ID пользователей
    message: z.string().optional(), // Сообщение об очереди
  });

  export const ShopsSchema = z.array(ShopSchema);
