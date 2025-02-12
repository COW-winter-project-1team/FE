import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요합니다!');
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
