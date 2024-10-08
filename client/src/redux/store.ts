import { configureStore } from '@reduxjs/toolkit';
import ShopsSlice from './shops/ShopsSlice';
import ShopsDateSlice from './shops/ShopsDateSlice';

export const store = configureStore({
  reducer: {
    shops: ShopsSlice.reducer,
    shopsDate: ShopsDateSlice.reducer,
  },
});

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
