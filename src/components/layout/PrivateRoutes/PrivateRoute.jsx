import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [{ token }] = useCookies(['token']);

  return token != null ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
