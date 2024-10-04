import type React from 'react';
import { useEffect } from 'react';
import {  getShopsThunk } from '../../redux/shops/ShopAsyncActions';
import type { EditShopType, ShopType } from '../../types/ShopTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useShops(): {
  shops: ShopType[];
} {
  const shops = useAppSelector((state) => state.shops.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getShopsThunk());
  }, [dispatch]);

 



  return { shops };
}