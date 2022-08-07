import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { getUser } from "store/auth";

import Main from "layout/Main";
import Register from "layout/Register";
import Login from "layout/Login";
import NotFound from "layout/NotFound";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  const user = useSelector(getUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/tasks"
          element={
            <ProtectedRoute user={user}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
