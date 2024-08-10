import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ButtonTemplate from "../../components/ButtonTemplate";
import useModelControl from "../../hooks/useModelControl";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import useModelRemove from "../../hooks/useModelRemove";
import FormUser from "../../components/Form/FormUser";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setContentEditor } from "../../slices/editorSlice";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

const ManageUsers = () => {
  const {
    dataEdit,
    handleOpenEdit,
    handleCloseEdit,
    isOpenEdit,
    isOpenCreate,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseAll,
  } = useModelControl();
  const [data, setData] = useState({
    users: [],
    meta: {},
    isLoading: true,
  });
  const { register, getValues, reset, setValue, control } = useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { contextHolder, handleRemove } = useModelRemove();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content_editor } = useSelector((state) => state.editor);

  const fetchData = async (currentPage = 1, pageSize = 10) => {
    setData((prevData) => ({ ...prevData, isLoading: true }));
    const url_users = `/users?current=${currentPage}&limit=${pageSize}`;
    try {
      const response_users = await api.get(url_users);
      setData({
        users: response_users.data.data.result,
        meta: response_users.data.data.meta,
        isLoading: false,
      });
      setPagination({
        current: response_users.data.data.meta.current,
        pageSize: response_users.data.data.meta.pageSize,
        total: response_users.data.data.meta.total,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      setData((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleResetAll = () => {
    reset({
      username: "",
      email: "",
      age: "",
      address: "",
      phone: "",
      password: "",
      gender: "",
    });
    dispatch(setContentEditor(""));
  };

  const handleCreateUser = async ({
    method,
    message_success,
    message_error,
  }) => {
    const dataUser = {
      username: getValues("username"),
      email: getValues("email"),
      age: getValues("age"),
      address: getValues("address"),
      phone: getValues("phone"),
      password: getValues("password"),
      gender: getValues("gender"),
      description: content_editor,
    };

    try {
      const access_token = localStorage.getItem("access_token");
      const url =
        method === "create"
          ? `${process.env.REACT_APP_HOST_BACKEND}/users`
          : `${process.env.REACT_APP_HOST_BACKEND}/users/${dataEdit._id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };
      await axios({
        method: method === "create" ? "post" : "put",
        url,
        data: dataUser,
        ...config,
      });
      toast.success(message_success);
      fetchData(pagination.current, pagination.pageSize); // Refresh data after creation or update
    } catch (error) {
      console.log("error: ", error);
      toast.error(message_error);
    }
    handleResetAll();
    handleCloseAll();
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
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
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
      width: "10%",
      render: (item, record) => (
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
              const url = `${process.env.REACT_APP_HOST_BACKEND}/users/${item._id}`;
              await handleRemove(item._id, url);
              fetchData(pagination.current, pagination.pageSize); // Refresh data after delete
            }}
            type="link"
            icon={<DeleteOutlined style={{ color: "red" }} />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end items-end">
        <ButtonTemplate
          onClick={() => {
            handleResetAll();
            handleOpenCreate();
          }}
        >
          <span>Create User</span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Spin spinning={data.isLoading}>
          <Table
            bordered
            columns={columns}
            dataSource={data.users}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </Spin>
        <Modal
          title="Update User"
          open={isOpenEdit}
          width="30%"
          onOk={() =>
            handleCreateUser({
              method: "update",
              message_success: "Cập nhật thành công",
              message_error: "Cập nhật thất bại",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormUser register={register} title="Update User" control={control} />
        </Modal>
        <Modal
          okText="Submit"
          title="Create User"
          width="30%"
          open={isOpenCreate}
          onOk={() =>
            handleCreateUser({
              method: "create",
              message_success: "Tạo mới thành công",
              message_error: "Tạo mới thất bại",
            })
          }
          onCancel={handleCloseCreate}
        >
          <FormUser
            type_field="create"
            register={register}
            control={control}
            title="Create User"
          />
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageUsers;
