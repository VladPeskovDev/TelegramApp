import type { z } from 'zod';
import type { ShopSchema } from '../utils/validatorsShop';
import type { UserType } from './UserTypes';


export type ShopType = z.infer<typeof ShopSchema>;

export type ShopDataType = Omit<ShopType, 'id'>;

export type ApiResponce = ShopType[];

export type EditShopType = {
    id: number;
    data: ShopDataType;
};

export type QueueEntry = {
    user_id: number;
    name: string;
    first_name: string;
    last_name: string;
    telegram_id: string | null;
    user?: UserType;
    createdAt: string;
    updatedAt: string;

  };
  
  export type ShopQueueResponse = {
    message: string;
    users: QueueEntry[];
    queue_date: string; 
    name: string; 
  };