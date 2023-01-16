import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loggedIn) navigate("/login", { state: { from: location } });
  }, [loggedIn]);

  return loggedIn ? children : null;
};

export default ProtectedRoute;
