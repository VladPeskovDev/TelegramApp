import { useEffect } from 'react';
import { getShopByIdThunk } from '../../redux/shops/ShopAsyncActions';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import type { ShopType } from '../../types/ShopTypes';

export default function useShop(id: string): {
  shop: ShopType | null;
  
} {
  const shop = useAppSelector((state) => state.shops.selectedShop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    
    const numericId = Number(id);

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(numericId)) {
      void dispatch(getShopByIdThunk(numericId));
    }
  }, [id, dispatch]);

  return { shop };
}
