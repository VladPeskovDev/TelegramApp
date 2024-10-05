import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './ui/NavBar';

export default function Layout(): JSX.Element {
  const location = useLocation();

  
  const showNavbar = location.pathname !== '/';

  return (
    <Container maxWidth="lg">
      {showNavbar && <Navbar />}
      <Outlet />
    </Container>
  );
};

