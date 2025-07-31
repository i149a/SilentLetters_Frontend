import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckSession } from "../../services/authService";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await CheckSession(); // Only verify if token exists
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    verify();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
