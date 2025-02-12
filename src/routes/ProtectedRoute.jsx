import { Navigate } from 'react-router-dom';
import { getCookie } from '../util/Cookie';

const ProtectedRoute = ({ children }) => {
  if (!getCookie('accessToken')) {
    alert('로그인을 먼저 해 주세요!');
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
