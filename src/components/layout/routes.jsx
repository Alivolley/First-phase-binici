// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
import Baskets from 'pages/Baskets/Baskets';
import CarBrand from 'pages/CarBrand/CarBrand';
import CarFactory from 'pages/CarFactory/CarFactory';
import CarModel from 'pages/CarModel/CarModel';
import CarProductionTime from 'pages/CarProductionTime/CarProductionTime';
import CarSeries from 'pages/CarSeries/CarSeries';
import CodeGroup from 'pages/CodeGroup/CodeGroup';
import CodingAttribute from 'pages/CodingAttribute/CodingAttribute';
import CodingProfile from 'pages/CodingProfile/CodingProfile';
import HomePage from 'pages/HomePage/HomePage';
import LocationDetail from 'pages/LocationDetail/LocationDetail';
import LocationsCategories from 'pages/LocationsCategories/LocationsCategories';
import MappingIndex from 'pages/MappingIndex/MappingIndex';
import MappingProfile from 'pages/MappingProfile/MappingProfile';
import ProductCategories from 'pages/ProductCategories/ProductCategories';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
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
  {
    id: '10',
    path: '/carFactory',
    element: <CarFactory />,
  },
  {
    id: '11',
    path: '/carBrand/:guid',
    element: <CarBrand />,
  },
  {
    id: '12',
    path: '/carModel/:guid',
    element: <CarModel />,
  },
  {
    id: '13',
    path: '/carSeries/:guid',
    element: <CarSeries />,
  },
  {
    id: '14',
    path: '/carProductionTime/:guid',
    element: <CarProductionTime />,
  },
  {
    id: '15',
    path: '/productDetail/:guid',
    element: <ProductDetail />,
  },
  {
    id: '16',
    path: '/product-graph/:guid',
    element: <ProductCategories />,
  },
  {
    id: '17',
    path: '/locations-graph/:guid',
    element: <LocationsCategories />,
  },
];
