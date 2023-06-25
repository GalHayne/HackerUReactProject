import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();


  if (user?.admin) {
    return children;
  }

  if (!user || !user?.biz) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
