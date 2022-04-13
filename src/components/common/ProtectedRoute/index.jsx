import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const user = useContext(UserContext);
  return user ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default ProtectedRoute;
