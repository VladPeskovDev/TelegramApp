import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear(); 

  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', backgroundColor: '#f8f8f8', mt: 5 }}>
      <Typography variant="body2" color="textSecondary">
        © {currentYear} Электронный листок СИЗО. Все права защищены.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Используя данное приложение, Вы соглашаетесь на обработку Ваших персональных данных.
      </Typography>
    </Box>
  );
}
