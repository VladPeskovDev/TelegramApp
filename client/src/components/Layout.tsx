import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Footer from './ui/Footer';


export default function Layout(): JSX.Element {
  

  return (
    <Container maxWidth="lg">
      <Outlet />

      <Footer />

    </Container>
  );
};

