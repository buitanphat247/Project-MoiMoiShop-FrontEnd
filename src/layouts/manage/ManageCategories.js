import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table } from "antd";
import ButtonTemplate from "../../components/ButtonTemplate";
import useModelControl from "../../hooks/useModelControl";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns"; // Import hàm format từ thư viện date-fns
import slugify from "slugify"; // Import slugify từ thư viện slugify
import useModelRemove from "../../hooks/useModelRemove";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormCategory from "../../components/Form/FormCategory";
import { useForm } from "react-hook-form";

const ManageCategories = () => {
  const {
    dataEdit,
    handleOpenEdit,
    isOpenEdit,
    isOpenCreate,
    handleOpenCreate,
    handleCloseAll,
  } = useModelControl();
  const [data, setData] = useState({
    categories: [],
    isLoading: true,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  }); // State cho phân trang
  const { contextHolder, handleRemove } = useModelRemove();
  const { register, setValue, getValues, reset } = useForm();
  const fetchData = async (page = 1, pageSize = 10) => {
    setData({
      ...data,
      isLoading: true,
    });
    const url = `${process.env.REACT_APP_HOST_BACKEND}/categories?current=${page}&limit=${pageSize}`;
    const response = await axios.get(url);

    setData({
      categories: response.data.data.result,
      isLoading: false,
    });
    setPagination({
      current: response.data.data.meta.current,
      pageSize: response.data.data.meta.pageSize,
      total: response.data.data.meta.total,
    });
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const formattedDate = format(
          new Date(createdAt),
          "dd/MM/yyyy HH:mm:ss"
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        const formattedDate = format(
          new Date(updatedAt),
          "dd/MM/yyyy HH:mm:ss"
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "3%",
      render: (item, record) => {
        return (
          <Space size="small">
            <Button
              onClick={() => {
                Object.keys(item).forEach((key) => {
                  setValue(key, item[key]);
                });
                handleOpenEdit(item);
              }}
              type="link"
              icon={<EditOutlined style={{ color: "orange" }} />}
            />
            <Button
              onClick={async () => {
                const url = `${process.env.REACT_APP_HOST_BACKEND}/categories/${item._id}`;
                await handleRemove(item._id, url);
                await fetchData();
              }}
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleResetCategoryForm = () => {
    reset({ name: "" });
  };

  const handleCategoryModel = async ({
    method,
    message_success,
    message_error,
  }) => {
    const Category = {
      name: getValues("name"),
      path: slugify(getValues("name"), {
        lower: true,
        replacement: "_",
      }),
    };

    const url =
      method === "create"
        ? `${process.env.REACT_APP_HOST_BACKEND}/categories`
        : `${process.env.REACT_APP_HOST_BACKEND}/categories/${dataEdit._id}`;
    const access_token = localStorage.getItem("access_token");
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response =
        method === "create"
          ? await axios.post(url, Category, config)
          : await axios.put(url, Category, config);

      toast.success(message_success);
      fetchData(pagination.current, pagination.pageSize); // Refresh data after update
    } catch (error) {
      console.log("error: ", error);
      toast.error(message_error);
    }
    handleResetCategoryForm();
    handleCloseAll();
  };

  return (
    <div>
      <div className="flex justify-end items-end">
        <ButtonTemplate
          onClick={() => {
            handleResetCategoryForm();
            handleOpenCreate();
          }}
        >
          <span>Create category</span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Spin spinning={data?.isLoading}>
          <Table
            bordered
            columns={columns}
            dataSource={data.categories}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Spin>

        <Modal
          title="Update Category"
          open={isOpenEdit}
          onOk={() =>
            handleCategoryModel({
              method: "update",
              message_success: "Cập nhật thành công!",
              message_error: "Cập nhật thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormCategory
            title="Update Category"
            register={register}
          ></FormCategory>
        </Modal>

        <Modal
          okText="Submit"
          title="Create Category"
          open={isOpenCreate}
          onOk={() =>
            handleCategoryModel({
              method: "create",
              message_success: "Tạo mới thành công!",
              message_error: "Tạo mới thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormCategory
            title="Create Category"
            register={register}
          ></FormCategory>
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageCategories;
