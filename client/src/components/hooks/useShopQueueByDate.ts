import { useAppDispatch, useAppSelector } from './reduxHooks';
import { getShopQueueByDateThunk } from '../../redux/shops/ShopAsyncDateActions';
import type { ShopQueueResponse } from '../../types/ShopTypes';

export default function useShopQueueByDate(): {
  queue: ShopQueueResponse | null;
  loading: boolean;
  error: string | null;
  fetchQueueByDate: (id: string, date: string) => void; // Добавляем функцию для запроса
} {
  const queue = useAppSelector((state) => state.shopsDate.selectedQueue);
  const loading = useAppSelector((state) => state.shopsDate.loading);
  const error = useAppSelector((state) => state.shopsDate.error);
  const dispatch = useAppDispatch();

  // Функция для запроса очереди по дате
  const fetchQueueByDate = (id: string, date: string): void => {
    if (id && date) {
      void dispatch(getShopQueueByDateThunk({ id, date }));
    }
  };

  return { queue, loading, error, fetchQueueByDate };
}
