// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
import HomePage from 'pages/HomePage/HomePage';
import { lazy } from 'react';

import Baskets from '../../pages/Baskets/Baskets';
import LocationDetail from '../../pages/LocationDetail/LocationDetail';

export const routes = [
  {
    id: '1',
    path: '/',
    element: <HomePage />,
  },
  {
    id: '2',
    path: '/locations/:guid',
    element: <LocationDetail />,
  },
  {
    id: '3',
    path: '/baskets/:guid',
    element: <Baskets />,
  },
];
