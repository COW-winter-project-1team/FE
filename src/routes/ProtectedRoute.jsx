import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  // 로컬스토리지에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("로그인을 먼저 해 주세요!", {
      position: "top-right",
    });
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
