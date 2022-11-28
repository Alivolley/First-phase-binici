import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import LoginPage from '$pages/LoginPage/LoginPage';

const PrivateLogin = () => {
  const [{ token }] = useCookies(['token']);

  return token == null ? <LoginPage /> : <Navigate to="/" />;
};

export default PrivateLogin;
