import { useAppDispatch, useAppSelector } from './reduxHooks';
import { getShopQueueByDateThunk, signupForQueueThunk, deleteQueueEntryThunk } from '../../redux/shops/ShopAsyncDateActions';
import type { ShopQueueResponse } from '../../types/ShopTypes';

export default function useShopQueueByDate(): {
  queue: ShopQueueResponse | null;
  loading: boolean;
  error: string | null;
  fetchQueueByDate: (id: string, date: string) => void;
  signupForQueue: (id: string, date: string, first_name: string, last_name: string, telegram_id: string | null) => Promise<void>;
  deleteQueueEntry: (id: string, date: string, telegram_id: string | null) => void;
  
} {
  const queue = useAppSelector((state) => state.shopsDate.selectedQueue);
  const loading = useAppSelector((state) => state.shopsDate.loading);
  const error = useAppSelector((state) => state.shopsDate.error);
  const dispatch = useAppDispatch();

  const fetchQueueByDate = (id: string, date: string): void => {
    if (id && date) {
      void dispatch(getShopQueueByDateThunk({ id, date }));
    }
  };

  

  const signupForQueue = async (id: string, date: string, first_name: string, last_name: string, telegram_id: string | null): Promise<void> => {
    if (id && date) {
      await dispatch(signupForQueueThunk({ id, date, first_name, last_name, telegram_id }));
    }
  };

  const deleteQueueEntry = (id: string, date: string, telegram_id: string | null): void => {
    if (id && date) {
      void dispatch(deleteQueueEntryThunk({ id, date, telegram_id }));
    }
  };

  return { queue, loading, error, fetchQueueByDate, signupForQueue, deleteQueueEntry };
}
