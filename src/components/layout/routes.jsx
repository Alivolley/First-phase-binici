// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
import Baskets from 'pages/Baskets/Baskets';
import CodeGroup from 'pages/CodeGroup/CodeGroup';
import CodingAttribute from 'pages/CodingAttribute/CodingAttribute';
import CodingProfile from 'pages/CodingProfile/CodingProfile';
import HomePage from 'pages/HomePage/HomePage';
import LocationDetail from 'pages/LocationDetail/LocationDetail';
import MappingIndex from 'pages/MappingIndex/MappingIndex';
import MappingProfile from 'pages/MappingProfile/MappingProfile';
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
  {
    id: '5',
    path: '/codeGroup',
    element: <CodeGroup />,
  },
  {
    id: '6',
    path: '/profileGroup',
    element: <CodingProfile />,
  },
  {
    id: '7',
    path: '/codingAttribute/:guid',
    element: <CodingAttribute />,
  },
  {
    id: '8',
    path: '/mappingProfile',
    element: <MappingProfile />,
  },
  {
    id: '9',
    path: '/mappingIndex/:guid',
    element: <MappingIndex />,
  },
];
