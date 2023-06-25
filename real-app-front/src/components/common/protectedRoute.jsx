import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRoute = ({ children, isBiz = false, isAdmin = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (user?.admin) {
    return children;
  }

  if (isBiz && user?.biz) {
    return children;
  }

  if (isAdmin && (!user.biz || user)) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
