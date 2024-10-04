import { createSlice } from '@reduxjs/toolkit';
import type { ShopType } from '../../types/ShopTypes';
import { getShopsThunk, getShopByIdThunk } from './ShopAsyncActions';

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
    builder.addCase(getShopByIdThunk.fulfilled, (state, { payload }) => {
      state.selectedShop = payload;
    })
  },
});

export default ShopsSlice;
