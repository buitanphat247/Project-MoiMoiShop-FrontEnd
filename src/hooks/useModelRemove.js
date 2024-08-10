import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import axios from "axios";
import React from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../config/api";

const useModelRemove = () => {
  const [modal, contextHolder] = Modal.useModal();
  const handleRemove = async (id, url) => {
    await modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Xác nhận xóa dữ liệu có ID: ${id}`,
      okText: "Submit",
      cancelText: "Cancel",
      onOk: async () => {
        const access_token = localStorage.getItem("access_token");
        try {
          const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          toast.success("Xóa thành công!");
        } catch (error) {
          toast.error("Xóa thất bại!");
        }
      },
    });
  };

  const handlePayment = async (id, url) => {
    await modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Xác nhận thanh toán đơn hàng: ${id}`,
      okText: "Submit",
      cancelText: "Cancel",
      onOk: async () => {
        const access_token = localStorage.getItem("access_token");
        try {
          const response = await axios.put(
            url,
            { status: "PENDING APPROVAL" },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          toast.success("Đặt hàng thành công!");
        } catch (error) {
          toast.error("Đặt hàng thất bại!");
        }
      },
    });
  };

  const handleChangeStatus = async (
    url,
    control,
    getValues,
    roleUser,
    status
  ) => {
    console.log("status: ", status);
    // Define options based on the user role
    const adminOptions = [
      { value: "PENDING RECEIPT", label: "Nhận Đơn" }, // Assuming 'từ chối' means 'REJECTED'
      { value: "REJECTED", label: "Hủy Đơn" }, // Assuming 'từ chối' means 'REJECTED'
    ];
    const userOptions =
      status === "PENDING APPROVAL"
        ? [
            { value: "REJECTED", label: "Hủy Hàng" }, // Assuming 'từ chối' means 'REJECTED'
          ]
        : [
            { value: "RECEIVED", label: "Nhận Hàng" }, // Assuming 'từ chối' means 'REJECTED'
            { value: "REJECTED", label: "Hủy Hàng" }, // Assuming 'đang giao' means 'RECEIVED'
          ];

    // Determine options based on role
    const options = roleUser === "ADMIN" ? adminOptions : userOptions;

    await modal.confirm({
      title: "Update Status",
      icon: <ExclamationCircleOutlined />,
      content: (
        <Controller
          control={control}
          name="updateStatus"
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: "100%" }}
              labelInValue
              options={options}
            />
          )}
        />
      ),
      okText: "Submit",
      cancelText: "Cancel",
      onOk: async () => {
        const { value } = getValues("updateStatus");
        const access_token = localStorage.getItem("access_token");
        try {
          const response = await api.put(
            url,
            { status: value },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          toast.success("Cập nhật thành công!");
        } catch (error) {
          toast.error("Cập nhật thất bại!");
        }
      },
    });
  };

  return {
    handleRemove,
    contextHolder,
    handleChangeStatus,
    handlePayment,
  };
};

export default useModelRemove;
