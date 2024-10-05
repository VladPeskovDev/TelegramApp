import { createAsyncThunk } from '@reduxjs/toolkit';
import ShopDataService from '../../services/ShopDataService';
import type { ShopQueueResponse} from '../../types/ShopTypes';


// eslint-disable-next-line import/prefer-default-export
export const getShopQueueByDateThunk = createAsyncThunk<ShopQueueResponse, { id: string, date: string }>(
    'shops/getQueueByDate',
    async ({ id, date }) => {
      const data = await ShopDataService.getShopQueueByDate(id, date);
      return data;
    }
  );
  