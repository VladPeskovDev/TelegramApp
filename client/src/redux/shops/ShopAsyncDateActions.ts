import { createAsyncThunk } from '@reduxjs/toolkit';
import ShopDataService from '../../services/ShopDataService';
import type { ShopQueueResponse } from '../../types/ShopTypes';
import type { RootState, AppDispatch } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const getShopQueueByDateThunk = createAsyncThunk<
  ShopQueueResponse,
  { id: string; date: string }
>('shops/getQueueByDate', async ({ id, date }) => {
  const data = await ShopDataService.getShopQueueByDate(id, date);
  return data;
});

export const signupForQueueThunk = createAsyncThunk<
  void,
  { id: string; date: string; first_name: string; last_name: string; telegram_id: string | null },
  { dispatch: AppDispatch }
>(
  'shops/signupForQueue',
  async ({ id, date, first_name, last_name, telegram_id }, { dispatch }) => {
    await ShopDataService.signupForQueue(id, date, first_name, last_name, telegram_id);
    dispatch(getShopQueueByDateThunk({ id, date }));
  },
);

export const deleteQueueEntryThunk = createAsyncThunk<void, { id: string, date: string, telegram_id: string | null }, { dispatch: AppDispatch }>(
  'shops/deleteQueueEntry',
  async ({ id, date, telegram_id }, { dispatch }) => {
    await ShopDataService.deleteQueueEntry(id, date, telegram_id);

    // После успешного удаления делаем повторный запрос на получение данных очереди
    dispatch(getShopQueueByDateThunk({ id, date }));
  }
);
