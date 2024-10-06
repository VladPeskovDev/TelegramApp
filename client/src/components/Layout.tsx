import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';


export default function Layout(): JSX.Element {
  

  return (
    <Container maxWidth="lg">
     
      <Outlet />
    </Container>
  );
};

