import { z } from 'zod';

export const UserSchema = z.object({
  telegram_id: z.string().nonempty('Telegram ID is required'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  is_premium: z.boolean().optional(),
});

export const UsersArraySchema = z.array(UserSchema);
