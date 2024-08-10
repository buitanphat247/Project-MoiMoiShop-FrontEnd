import React, { useEffect, useState } from "react";
import { Button, Space, Spin, Table } from "antd";
import QuantitySelector from "../../components/button/QuantitySelector";
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useModelRemove from "../../hooks/useModelRemove";
import { formatPrice } from "../../pages/Detail";
import { useSelector } from "react-redux";
import api from "../../config/api";

const Cart = () => {
  const [data, setData] = useState({
    orders: [],
    isLoading: true,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const { setValue, getValues, control } = useForm();
  const navigate = useNavigate();
  const { contextHolder, handleRemove, handlePayment } = useModelRemove();
  const { currentUser } = useSelector((state) => state.auth);

  const fetchData = async (currentPage = 1, pageSize = 10) => {
    setData({ ...data, isLoading: true });
    const roleUser = currentUser?.role?.name;
    const IdUser = currentUser?._id;
    const url =
      roleUser === "ADMIN"
        ? `/orders?current=${currentPage}&limit=${pageSize}&status=CART&populate=productId`
        : `/orders?current=${currentPage}&limit=${pageSize}&status=CART&populate=productId&createdBy._id=${IdUser}`;

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
        return editingProductId === item._id ? (
          <QuantitySelector
            control={control}
            initialQuantity={parseInt(item.quanlity, 10)}
            setValue={setValue}
          />
        ) : (
          <span>{item.quanlity}</span>
        );
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
      title: "Action",
      key: "action",
      width: "3%",
      render: (item) => {
        return (
          <Space size="small">
            <Button
              onClick={() => {
                navigate(`/product/${item.productId._id}`);
              }}
              type="link"
              icon={<EyeOutlined style={{ color: "blue" }} />}
            />
            <Button
              type="link"
              onClick={async () => {
                const url = `${process.env.REACT_APP_HOST_BACKEND}/orders/${item._id}`;
                await handlePayment(item._id, url);
                fetchData(pagination.current, pagination.pageSize); // Refresh data after update
              }}
              icon={<CreditCardOutlined style={{ color: "green" }} />}
            />

            {editingProductId === item._id ? (
              <Button
                type="link"
                icon={<CheckOutlined style={{ color: "orange" }} />}
                onClick={async () => {
                  const access_token = localStorage.getItem("access_token");
                  const url = `${process.env.REACT_APP_HOST_BACKEND}/orders/${item._id}`;
                  const config = {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                    withCredentials: true,
                  };
                  try {
                    await api.put(url, {
                      quanlity: getValues("newQuantity"),
                    });
                    toast.success("Cập nhật thành công");
                    fetchData(pagination.current, pagination.pageSize); // Refresh data after update
                  } catch (error) {
                    toast.error("Cập nhật thất bại");
                  }
                  setEditingProductId(null); // Hoàn thành chỉnh sửa và đóng chế độ chỉnh sửa
                }}
              />
            ) : (
              <Button
                type="link"
                onClick={() => {
                  setEditingProductId(item._id); // Mở chế độ chỉnh sửa cho sản phẩm hiện tại
                }}
                icon={<EditOutlined style={{ color: "orange" }} />}
              />
            )}
            {/* remove order form cart */}
            <Button
              type="link"
              onClick={async () => {
                const url = `${process.env.REACT_APP_HOST_BACKEND}/orders/${item._id}`;
                await handleRemove(item._id, url);
                fetchData(pagination.current, pagination.pageSize); // Refresh data after update
              }}
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
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

export default Cart;
