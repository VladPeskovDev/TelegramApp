import React from 'react';
import { createBrowserRouter, RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import Shop1Page from './components/pages/Shop1Page';
import Shop2Page from './components/pages/Shop2Page';
import Shop3Page from './components/pages/Shop3Page';
import Shop4Page from './components/pages/Shop4Page';
import Shop5Page from './components/pages/Shop5Page';
import Shop6Page from './components/pages/Shop6Page';
import Shop7Page from './components/pages/Shop7Page';
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
          path: '/Shop1',
          element: <Shop1Page />,
        },
        {
          path: '/Shop2',
          element: <Shop2Page />,
        },
        {
          path: '/Shop3',
          element: <Shop3Page />,
        },
        {
          path: '/Shop4',
          element: <Shop4Page />,
        },
        {
          path: '/Shop5',
          element: <Shop5Page />,
        },
        {
          path: '/Shop6',
          element: <Shop6Page />,
        },
        {
          path: '/Shop7',
          element: <Shop7Page />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
