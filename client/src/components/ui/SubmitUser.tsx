import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

type SubmitUserProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string) => void;
};

export default function SubmitUser({ open, onClose, onSubmit }: SubmitUserProps): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (): void => {
    onSubmit(firstName, lastName);
    setFirstName('');
    setLastName('');
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
