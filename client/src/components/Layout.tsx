import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './ui/NavBar';

export default function Layout(): JSX.Element {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <Outlet />
    </Container>
  );
}
