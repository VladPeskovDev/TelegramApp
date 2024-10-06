import type { z } from 'zod';
import type { UserSchema } from '../utils/validatorsUser';

// Тип для одного пользователя
export type UserType = z.infer<typeof UserSchema>;

// Тип для списка пользователей
export type UsersArrayType = UserType[];
