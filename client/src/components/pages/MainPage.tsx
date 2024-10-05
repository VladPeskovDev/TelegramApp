import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useShops from '../hooks/useShops';

export default function MainPage(): JSX.Element {
  const { shops } = useShops(); 

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
    >
      {shops.map((shop) => (
        <Link key={shop.id} to={`/shop/${shop.id}`} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '250px',
              height: '250px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.3s',
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
