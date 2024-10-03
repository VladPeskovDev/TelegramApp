import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop1" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 1
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop2" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 2
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop3" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 3
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop4" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 4
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop5" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 5
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop6" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 6
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Link to="/Shop7" style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
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
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                СИЗО 7
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}
