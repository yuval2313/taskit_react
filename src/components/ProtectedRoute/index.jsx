import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);

  return loggedIn ? children : null;
};

export default ProtectedRoute;
