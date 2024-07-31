// GuestGuard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

const GuestGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!isInitialized) return <Spin />;

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default GuestGuard;
