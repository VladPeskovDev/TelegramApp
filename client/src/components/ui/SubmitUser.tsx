import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useShopQueueByDate from '../hooks/useShopQueueByDate'; 

type SubmitUserProps = {
  open: boolean;
  onClose: () => void;
};

export default function SubmitUser({ open, onClose }: SubmitUserProps): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const { id } = useParams<{ id: string }>(); // Получаем id магазина
  const { signupForQueue } = useShopQueueByDate(); // Подключаем хук

  const handleSubmit = async (): Promise<void> => {
    if (id) {
      try {
        
        await signupForQueue(id, new Date().toISOString().split('T')[0], firstName, lastName, null); // id, текущая дата, имя, фамилия, telegram_id

        // После успешной записи перезагружаем страницу
        window.location.reload(); 
      } catch (error) {
        console.error('Ошибка при записи в очередь:', error);
      }
    }
    setFirstName('');
    setLastName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '400px', borderRadius: '8px', mt: '20vh' }}>
        <Typography variant="h6" gutterBottom>
          Записаться в очередь
        </Typography>
        <TextField
          label="Фамилия"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Имя"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Записаться
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
