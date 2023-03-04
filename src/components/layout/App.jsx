import 'react-perfect-scrollbar/dist/css/styles.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import axiosClient from 'lib/axiosClient';
import HomePage from 'pages/HomePage/HomePage';
import NotFound from 'pages/NotFound/NotFound';
import { Suspense } from 'react';
import { useCookies } from 'react-cookie';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLayout/AppLayout';
import PrivateLogin from './PrivateRoutes/PrivateLogin';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import { routes } from './routes';

const App = () => {
  const [{ token }, setCookie, removeCookie] = useCookies(['token']);

  axiosClient.interceptors.request.use(config => {
    config.headers = config.headers ?? {};
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });
  axiosClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        // removeCookie('token', {
        //   path: '/',
        // });
      }
      return error;
    },
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route element={<AppLayout />}>
              {routes.map(route => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<PrivateRoute>{route.element}</PrivateRoute>}
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/Login" element={<PrivateLogin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DndProvider>
  );
};

export default App;
