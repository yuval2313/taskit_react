import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { isLoggedIn } from "store/auth";

import Main from "layout/Main";
import Login from "layout/Login";
import NotFound from "layout/NotFound";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  const loggedIn = useSelector(isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/tasks"
          element={
            <ProtectedRoute loggedIn={!!loggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
