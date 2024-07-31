// components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, loading } = useSelector((state) => state.auth);

  if (loading) {
    // Nếu dữ liệu đang được tải, hiển thị một giao diện loading
    return <div>Loading...</div>;
  }

  if (!currentUser || !allowedRoles.includes(currentUser?.role?.name)) {
    // Nếu người dùng không có quyền truy cập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Nếu có quyền, render nội dung route con
  return <Outlet />;
};

export default ProtectedRoute;
