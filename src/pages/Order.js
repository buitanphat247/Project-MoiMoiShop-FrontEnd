import { Tabs } from "antd";
import React from "react";
import Cart from "../layouts/orderManage/Cart";
import OrderManagage from "../layouts/orderManage/OrderManage";
import OrderHistory from "../layouts/orderManage/OrderHistory";
import { useSelector } from "react-redux";

const Order = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const role_user = currentUser?.role?.name;
  const items =
    role_user === "ADMIN"
      ? [
          {
            key: "1",
            label: "Giỏ hàng",
            children: <Cart></Cart>,
          },
          {
            key: "2",
            label: "Quản lí gian hàng",
            children: <OrderManagage></OrderManagage>,
          },
          {
            key: "3",
            label: "Lịch sử bán hàng",
            children: <OrderHistory></OrderHistory>,
          },
        ]
      : [
          {
            key: "1",
            label: "Giỏ hàng",
            children: <Cart></Cart>,
          },
          {
            key: "2",
            label: "Quản lí đơn hàng",
            children: <OrderManagage></OrderManagage>,
          },
          {
            key: "3",
            label: "Lịch sử nhận hàng",
            children: <OrderHistory></OrderHistory>,
          },
        ];
  return (
    <div className="mt-5 p-5 bg-white">
      <div className="mt-5">
        <Tabs
          tabBarExtraContent={
            <h1 className="text-2xl capitalize font-semibold pb-3">Orders</h1>
          }
          type="card"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default Order;
