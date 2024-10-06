import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useShopQueueByDate from '../hooks/useShopQueueByDate'; 


type SubmitUserProps = {
  open: boolean;
  onClose: () => void;
  selectedDate: string; 
};

export default function SubmitUser({ open, onClose, selectedDate }: SubmitUserProps): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const { id } = useParams<{ id: string }>(); 
  const { signupForQueue } = useShopQueueByDate(); 

  const handleSubmit = async (): Promise<void> => {
    if (id) {
      try {
        // Используем выбранную дату
        await signupForQueue(id, selectedDate, firstName, lastName, null); 
        window.location.reload(); // Перезагружаем страницу после успешной записи
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
