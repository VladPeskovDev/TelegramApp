import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

type DeleteUserProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteUser({ open, onClose, onDelete }: DeleteUserProps): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '400px', borderRadius: '8px', mt: '20vh' }}>
        <Typography variant="h6" gutterBottom>
          Вы уверены, что хотите отменить запись?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onDelete}>
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
