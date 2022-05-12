import { useEffect } from "react";

import { useSelector } from "react-redux";
import { isLoggedIn } from "../../../store/auth/auth";

const UnprotectedRoute = ({ children }) => {
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    if (loggedIn) window.location = "/";
  }, [loggedIn]);

  return !loggedIn ? children : null;
};

export default UnprotectedRoute;
