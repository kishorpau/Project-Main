import { Navigate } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user
    ? { isAuthenticated: true, role: user.role }
    : { isAuthenticated: false };
};

const PrivateRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
