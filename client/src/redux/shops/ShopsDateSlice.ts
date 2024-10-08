import { createSlice } from '@reduxjs/toolkit';
import { getShopQueueByDateThunk, signupForQueueThunk, deleteQueueEntryThunk } from './ShopAsyncDateActions';
import type { ShopQueueResponse } from '../../types/ShopTypes';

type InitialStateType = {
  selectedQueue: ShopQueueResponse | null;
  loading: boolean;
  error: string | null;
  signupSuccess: boolean | null;
  deleteSuccess: boolean | null;
};

const initialState: InitialStateType = {
  selectedQueue: null,
  loading: false,
  error: null,
  signupSuccess: null,
  deleteSuccess: null,
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
    builder.addCase(signupForQueueThunk.fulfilled, (state) => {
      state.signupSuccess = true;
    });
    builder.addCase(signupForQueueThunk.rejected, (state, { error }) => {
      state.signupSuccess = false;
      state.error = error.message || 'Ошибка записи в очередь';
    });

    builder.addCase(deleteQueueEntryThunk.pending, (state) => {
      state.loading = true;
      state.deleteSuccess = null;  // Сбрасываем флаг перед началом удаления
      state.error = null;
    });
    builder.addCase(deleteQueueEntryThunk.fulfilled, (state) => {
      state.deleteSuccess = true;
      state.loading = false;
    });
    builder.addCase(deleteQueueEntryThunk.rejected, (state, { error }) => {
      state.deleteSuccess = false;
      state.loading = false;
      state.error = error.message || 'Ошибка удаления записи из очереди';
    });
  },
});

export default ShopsSlice;
