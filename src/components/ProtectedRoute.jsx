import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  );
};

export default ProtectedRoute;
