import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { getCurrentUser } from "./services/authService";
import UserContext from "./context/UserContext";

import App from "./App";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={getCurrentUser()}>
        <Routes>
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
