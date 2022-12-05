// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
import HomePage from 'pages/HomePage/HomePage';
import { lazy } from 'react';

export const routes = [
  {
    id: '1',
    path: '/',
    element: <HomePage />,
  },
];
