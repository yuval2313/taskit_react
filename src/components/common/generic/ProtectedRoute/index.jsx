import { useEffect } from "react";

import { useSelector } from "react-redux";
import { getUser } from "../../../../store/auth";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(getUser);

  useEffect(() => {
    if (!user) window.location = "/login";
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;
