import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link, useParams, useLocation  } from 'react-router-dom';
import useShops from '../hooks/useShops';

export default function MainPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { shops } = useShops(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramId = queryParams.get('telegram_id');

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px', 
        padding: '20px',
        '@media (max-width: 600px)': {
          flexDirection: 'column', 
          alignItems: 'center',
        },
      }}
    > <h3>Выберите изолятор для записи </h3>
      {shops.map((shop) => (
        <Link key={shop.id} to={`/shop/${shop.id}${telegramId ? `?telegram_id=${telegramId}` : ''}`} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '250px',
              height: '250px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.3s',
              border: '1px solid', 
              borderColor: 'grey.400',
              borderRadius: '8px', 
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5">{shop.name}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
}
