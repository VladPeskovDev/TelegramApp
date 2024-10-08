import { createSlice } from '@reduxjs/toolkit';
import type { QueueEntry, ShopQueueResponse } from '../../types/ShopTypes';
import {
  deleteQueueEntryThunk,
  getShopQueueByDateThunk,
  signupForQueueThunk,
} from './ShopAsyncDateActions';

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

const ShopsDateSlice = createSlice({
  name: 'shopsDate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Загрузка очереди
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

    // Добавляем пользователя в очередь после успешного добавления
    builder.addCase(signupForQueueThunk.fulfilled, (state, action) => {
      if (state.selectedQueue && action.meta.arg.telegram_id !== null) {
        const newUser: QueueEntry = {
          user_id: Number(action.meta.arg.telegram_id), // Приводим telegram_id к числу
          first_name: action.meta.arg.first_name,
          last_name: action.meta.arg.last_name,
          name: `${action.meta.arg.first_name} ${action.meta.arg.last_name}`,
        };
        state.selectedQueue.users.push(newUser); // Добавляем нового пользователя в очередь
      }
      state.signupSuccess = true;
    });
    builder.addCase(signupForQueueThunk.rejected, (state, { error }) => {
      state.signupSuccess = false;
      state.error = error.message || 'Ошибка записи в очередь';
    });

    builder.addCase(deleteQueueEntryThunk.fulfilled, (state, action) => {
      if (state.selectedQueue && action.meta.arg.telegram_id !== null) {
        const telegramIdAsNumber = Number(action.meta.arg.telegram_id); // Приводим telegram_id к числу
        state.selectedQueue.users = state.selectedQueue.users.filter(
          (user) => user.user_id !== telegramIdAsNumber, // Сравниваем с приведенным типом
        );
      }
      state.deleteSuccess = true;
    });

    builder.addCase(deleteQueueEntryThunk.rejected, (state, { error }) => {
      state.deleteSuccess = false;
      state.error = error.message || 'Ошибка удаления записи из очереди';
    });
  },
});

export default ShopsDateSlice;
