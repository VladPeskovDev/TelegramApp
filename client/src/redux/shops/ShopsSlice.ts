import { createSlice } from '@reduxjs/toolkit';
import type { ShopType } from '../../types/ShopTypes';
import { getShopsThunk } from './ShopAsyncActions';

type InitialStateType = {
  data: ShopType[];
  selectedShop: ShopType | null;
};

const initialState: InitialStateType = {
  data: [],
  selectedShop: null,
};

const ShopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopsThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export default ShopsSlice;
