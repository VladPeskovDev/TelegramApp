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
    // Преобразуем id в число перед отправкой в thunk
    const numericId = Number(id);

    // Если id корректный (не NaN), отправляем запрос
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(numericId)) {
      void dispatch(getShopByIdThunk(numericId));
    }
  }, [id, dispatch]);

  return { shop };
}
