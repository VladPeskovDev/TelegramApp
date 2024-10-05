import type { z } from 'zod';
import type { ShopSchema } from '../utils/validatorsShop';


export type ShopType = z.infer<typeof ShopSchema>;

export type ShopDataType = Omit<ShopType, 'id'>;

export type ApiResponce = ShopType[];

export type EditShopType = {
    id: number;
    data: ShopDataType;
};

export type QueueEntry = {
    user_id: number;
  };
  
  export type ShopQueueResponse = {
    message: string;
    users: QueueEntry[];
    queue_date: string; // Это будет дата в формате строки (например, ISO)
    name: string; // Название магазина
  };