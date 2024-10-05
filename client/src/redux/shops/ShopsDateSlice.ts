// redux/shops/ShopsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getShopQueueByDateThunk } from './ShopAsyncDateActions';
import type { ShopQueueResponse } from '../../types/ShopTypes';

type InitialStateType = {
  selectedQueue: ShopQueueResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  selectedQueue: null,
  loading: false,
  error: null,
};

const ShopsSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopQueueByDateThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getShopQueueByDateThunk.fulfilled, (state, { payload }) => {
      state.selectedQueue = payload;
      state.loading = false;
    });
    builder.addCase(getShopQueueByDateThunk.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || 'Ошибка загрузки данных';
    });
  },
});

export default ShopsSlice;
