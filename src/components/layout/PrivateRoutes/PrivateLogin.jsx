import LoginPage from 'pages/LoginPage/LoginPage';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const PrivateLogin = () => {
  const [{ token }] = useCookies(['token']);

  return token == null ? <LoginPage /> : <Navigate to="/" />;
};

export default PrivateLogin;
