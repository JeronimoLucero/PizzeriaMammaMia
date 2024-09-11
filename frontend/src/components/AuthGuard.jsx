import { Navigate } from "react-router-dom";
import { useUser } from '../context/usercontext';

const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;