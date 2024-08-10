import { Tabs } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import ManageUsers from "../layouts/manage/ManageUsers";
import ManageProducts from "../layouts/manage/ManageProducts";
import ManageCategories from "../layouts/manage/ManageCategories";
import ManageRoles from "../layouts/manage/ManageRoles";
import Manage from "../layouts/manage/Manage";
import ManagePermissions from "../layouts/manage/ManagePermissions";

const items = [
  {
    key: "1",
    label: "Dashboard",
    children: <Manage></Manage>,
  },
  {
    key: "2",
    label: "Users",
    children: <ManageUsers></ManageUsers>,
  },
  {
    key: "3",
    label: "Products",
    children: <ManageProducts></ManageProducts>,
  },
  {
    key: "4",
    label: "Categories",
    children: <ManageCategories></ManageCategories>,
  },
  {
    key: "5",
    label: "Roles",
    children: <ManageRoles> </ManageRoles>,
  },
  {
    key: "6",
    label: "Permissions",
    children: <ManagePermissions></ManagePermissions>,
  },
];
const DashboardAdmin = () => {
  const location = useLocation();
  const adminPath =
    location.pathname === "/admin"
      ? location.pathname.replace("/admin", "dashboard")
      : location.pathname.replace("/admin/", "");
  return (
    <div className="mt-5 p-5 bg-white">
      <div className="mt-5">
        <Tabs
          tabBarExtraContent={
            <h1 className="text-2xl capitalize font-semibold pb-3">
              Trang quản trị
            </h1>
          }
          type="card"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default DashboardAdmin;
