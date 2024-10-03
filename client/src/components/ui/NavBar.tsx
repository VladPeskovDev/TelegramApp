import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Navbar(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        flexWrap: 'wrap', // Для мобильной адаптации
        '@media (max-width: 600px)': {
          flexDirection: 'column', // На мобильных устройствах выравнивание столбиком
          alignItems: 'center',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          },
          margin: '5px',
        }}
      >
        Понедельник
      </Typography>

      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          },
          margin: '5px',
        }}
      >
        Вторник
      </Typography>

      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          },
          margin: '5px',
        }}
      >
        Среда
      </Typography>

      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          },
          margin: '5px',
        }}
      >
        Четверг
      </Typography>

      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'blue',
          },
          margin: '5px',
        }}
      >
        Пятница
      </Typography>
    </Box>
  );
}
