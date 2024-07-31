import React, { useEffect, useState } from "react";
import { Button, Space, Spin, Table, Tag } from "antd";
import QuantitySelector from "../../components/button/QuantitySelector";
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useModelRemove from "../../hooks/useModelRemove";
import { formatPrice } from "../../pages/Detail";
import { useSelector } from "react-redux";

const OrderManagage = () => {
  const [data, setData] = useState({
    orders: [],
    isLoading: true,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const { contextHolder, handleRemove, handleChangeStatus } = useModelRemove();
  const { control, setValue, getValues } = useForm();
  const { currentUser } = useSelector((state) => state.auth);
  const fetchData = async (currentPage = 1, pageSize = 10) => {
    setData({ ...data, isLoading: true });
    const roleUser = currentUser?.role?.name;
    const IdUser = currentUser?._id;
    console.log("IdUser: ", IdUser);
    const url =
      roleUser === "ADMIN"
        ? `${process.env.REACT_APP_HOST_BACKEND}/orders?current=${currentPage}&limit=${pageSize}&status=/PENDING APPROVAL/i,/PENDING RECEIPT/i&populate=productId`
        : `${process.env.REACT_APP_HOST_BACKEND}/orders?current=${currentPage}&limit=${pageSize}&status=/PENDING APPROVAL/i,/PENDING RECEIPT/i&populate=productId&createdBy._id=${IdUser}`;
    console.log("url: ", url);

    const response = await axios.get(url);
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
        const colorStatus =
          item === "PENDING RECEIPT" ? "yellow" : "processing";

        return (
          <Tag icon={<ClockCircleOutlined />} color={colorStatus}>
            {item === "PENDING RECEIPT" ? "Đang Giao" : "Đợi Duyệt"}
          </Tag>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      width: "3%",
      render: (item) => {
        const roleUser = currentUser?.role?.name;
        return (
          <Space size="small">
            <Button
              onClick={() => {
                navigate(`/product/${item.productId._id}`);
              }}
              type="link"
              icon={<EyeOutlined style={{ color: "bue" }} />}
            />

            {((item.status === "PENDING RECEIPT" && roleUser === "USER") ||
              (roleUser === "ADMIN" && item.status !== "PENDING RECEIPT")) && (
              <Button
                type="link"
                onClick={async () => {
                  const url = `${process.env.REACT_APP_HOST_BACKEND}/orders/${item._id}`;
                  setValue("updateStatus", item.status);
                  const status = item.status;
                  await handleChangeStatus(
                    url,
                    control,
                    getValues,
                    roleUser,
                    status
                  );
                  fetchData(pagination.current, pagination.pageSize); // Refresh data after update
                }}
                icon={<MenuOutlined style={{ color: "green" }} />}
              />
            )}
            {roleUser === "USER" && item.status === "PENDING APPROVAL" && (
              <Button
                type="link"
                onClick={async () => {
                  const url = `${process.env.REACT_APP_HOST_BACKEND}/orders/${item._id}`;
                  await handleRemove(item._id, url);
                  fetchData(pagination.current, pagination.pageSize); // Refresh data after update
                }}
                icon={<DeleteOutlined style={{ color: "red" }} />}
              />
            )}
          </Space>
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
      {contextHolder}
    </div>
  );
};

export default OrderManagage;
