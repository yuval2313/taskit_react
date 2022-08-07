import { useEffect } from "react";

const ProtectedRoute = ({ user, children }) => {
  useEffect(() => {
    if (!user) window.location = "/login";
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;
