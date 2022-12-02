import 'react-perfect-scrollbar/dist/css/styles.css';

import axiosClient from 'lib/axiosClient';
import NotFound from 'pages/NotFound/NotFound';
import { Suspense } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLayout/AppLayout';
import PrivateLogin from './PrivateRoutes/PrivateLogin';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import { routes } from './routes';

const App = () => {
  const [{ token }] = useCookies(['token']);

  axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = token;
    return config;
  });
  axiosClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        // log out
      }
      return error;
    },
  );

  return (
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
  );
};

export default App;
