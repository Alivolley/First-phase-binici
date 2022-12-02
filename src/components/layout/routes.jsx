import { lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));

export const routes = [
  {
    id: '1',
    path: '/',
    element: <HomePage />,
  },
];
