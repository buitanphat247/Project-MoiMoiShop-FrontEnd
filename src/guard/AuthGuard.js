// AuthGuard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

const AuthGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!isInitialized) return <Spin />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default AuthGuard;
