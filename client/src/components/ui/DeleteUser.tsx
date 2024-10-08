import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import useShopQueueByDate from '../hooks/useShopQueueByDate';

type DeleteUserProps = {
  open: boolean;
  onClose: () => void;
  storeId: string; // Добавляем id магазина
  date: string; // Добавляем дату очереди
  telegramId: string | null; // Добавляем telegram_id пользователя
};

export default function DeleteUser({ open, onClose, storeId, date, telegramId }: DeleteUserProps): JSX.Element {
  const { deleteQueueEntry } = useShopQueueByDate();

  const handleDelete = (): void => {
    // Вызываем deleteQueueEntry с нужными параметрами
    deleteQueueEntry(storeId, date, telegramId);
    onClose(); // Закрываем модалку после удаления
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '400px', borderRadius: '8px', mt: '20vh' }}>
        <Typography variant="h6" gutterBottom>
          Вы уверены, что хотите отменить запись?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Удалить запись
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
