import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import MainPage from './components/pages/MainPage';
import ShopPage from './components/pages/ShopPage';
import Layout from './components/Layout';


function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/Shop/:id',
          element: <ShopPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
