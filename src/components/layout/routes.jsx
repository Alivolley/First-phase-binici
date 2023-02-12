// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
import Baskets from 'pages/Baskets/Baskets';
import HomePage from 'pages/HomePage/HomePage';
import LocationDetail from 'pages/LocationDetail/LocationDetail';
import ProductList from 'pages/ProductList/ProductList';
import { lazy } from 'react';

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
  {
    id: '4',
    path: '/productsList',
    element: <ProductList />,
  },
];
