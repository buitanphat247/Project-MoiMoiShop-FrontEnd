import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../pages/Detail";
import { useSelector } from "react-redux";
import api from "../../config/api";

const OrderHistory = () => {
  const [data, setData] = useState({
    orders: [],
    isLoading: true,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { currentUser } = useSelector((state) => state.auth);
  const fetchData = async (currentPage = 1, pageSize = 10) => {
    setData({ ...data, isLoading: true });
    const roleUser = currentUser?.role?.name;
    const IdUser = currentUser?._id;
    const url =
      roleUser === "ADMIN"
        ? `/orders?current=${currentPage}&limit=${pageSize}&status=/RECEIVED/i&populate=productId`
        : `/orders?current=${currentPage}&limit=${pageSize}&status=/RECEIVED/i&populate=productId&createdBy._id=${IdUser}`;
    const response = await api.get(url);
    setData({ orders: response.data.data.result, isLoading: false });
    setPagination({
      current: response.data.data.meta.current,
      pageSize: response.data.data.meta.pageSize,
      total: response.data.data.meta.total,
    });
  };

  useEffect(() => {
    if (currentUser) fetchData(pagination.current, pagination.pageSize);
  }, [currentUser]);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: "5%",
      render: (text, record, index) =>
        index + 1 + (pagination.current - 1) * pagination.pageSize,
    },
    {
      title: "ID",
      key: "_id",
      width: "5%",
      render: (item) => {
        const idDisplay =
          item._id.length > 5 ? `${item._id.slice(15, 30)}...` : item._id;
        return <span>{idDisplay}</span>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Product's Name",
      dataIndex: "productId",
      key: "productId",
      render: (item) => <span>{item.name}</span>,
    },
    {
      title: "Quantity",
      render: (item) => {
        return <span>{item.quanlity}</span>;
      },
    },
    {
      title: "Total Price",
      render: (item) => (
        <Space>
          <span>
            {formatPrice(
              parseInt(item.productId.price, 10) * parseInt(item.quanlity, 10)
            )}
          </span>
          <span>VND</span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã Nhận
          </Tag>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mt-5">
        <Spin spinning={data?.isLoading}>
          <Table
            bordered
            columns={columns}
            dataSource={data.orders}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </Spin>
      </div>
    </div>
  );
};

export default OrderHistory;
