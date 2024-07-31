import React, { useEffect, useState } from "react";
import { Checkbox, Modal, Space, Spin, Table } from "antd";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import useModelRemove from "../../hooks/useModelRemove";
import useModelControl from "../../hooks/useModelControl";
import ButtonTemplate from "../../components/ButtonTemplate";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormUser from "../../components/Form/FormUser";
import { useForm } from "react-hook-form";

const ManageUsers = () => {
  const [dataUser, setDataUser] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // State cho phân trang
  const { register, setValue, reset, getValues } = useForm();
  const {
    dataEdit,
    handleOpenEdit,
    handleCloseEdit,
    isOpenEdit,
    isOpenCreate,
    handleOpenCreate,
    handleCloseCreate,
  } = useModelControl();

  const { contextHolder, handleRemove } = useModelRemove();
  // config table ant design
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
      ..."email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ..."address",
      filterSearch: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ..."phone",
      filterSearch: true,
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (item) => {
        return item.name;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        // Chuyển đổi từ ISO 8601 sang ngày tháng năm
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
        // Chuyển đổi từ ISO 8601 sang ngày tháng năm
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
              onClick={() => {
                const url = `${process.env.REACT_APP_HOST_BACKEND}/users/${item._id}`;
                handleRemove(item._id, url);
              }}
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Space>
        );
      },
    },
  ];

  // fetch data table
  useEffect(() => {
    const fecthUser = async () => {
      const url = `${process.env.REACT_APP_HOST_BACKEND}/users`;
      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setDataUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthUser();
  }, [dataUser]);

  // Xử lý khi thay đổi phân trang
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  // config reset form user
  const handleResetFormUser = () => {
    reset({
      username: "",
      email: "",
      age: "",
      address: "",
      phone: "",
      password: "",
      gender: "",
    });
  };

  // config handle create user
  const handleCreateUser = async () => {
    const createUser = {
      username: getValues("username"),
      email: getValues("email"),
      age: getValues("age"),
      address: getValues("address"),
      phone: getValues("phone"),
      password: getValues("password"),
      gender: getValues("gender"),
    };
    const url = `${process.env.REACT_APP_HOST_BACKEND}/auths/register`;
    try {
      const response = await axios.post(url, createUser, {
        withCredentials: true,
      });
      toast.success("Tạo mới người dùng thành công!");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Có lỗi xảy ra, vui lòng nhập lại!");
    }
    handleResetFormUser();
    handleCloseCreate();
  };

  // config handle update user
  const handleUpdateUser = async () => {
    const updateUser = {
      username: getValues("username"),
      email: getValues("email"),
      age: getValues("age"),
      address: getValues("address"),
      phone: getValues("phone"),
      gender: getValues("gender"),
    };
    const access_token = localStorage.getItem("access_token");
    const url = `${process.env.REACT_APP_HOST_BACKEND}/users/${dataEdit._id}`;
    try {
      const response = await axios.put(url, updateUser, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      });
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Cập nhật thất bại!");
    }
    handleResetFormUser();
    handleCloseEdit();
  };

  return (
    <div>
      <div className="flex justify-end items-end">
        <ButtonTemplate
          onClick={() => {
            handleResetFormUser();
            handleOpenCreate();
          }}
        >
          <span>Create user</span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Table
          bordered
          columns={columns}
          dataSource={dataUser}
          onChange={handleTableChange}
        />
        {/* Model edit */}
        <Modal
          title="Update User"
          open={isOpenEdit}
          onOk={handleUpdateUser}
          onCancel={handleCloseEdit}
        >
          <FormUser
            register={register}
            title="Update User"
            type_field="update"
          ></FormUser>
        </Modal>
        {/* model create */}

        <Modal
          title="Create User"
          open={isOpenCreate}
          okText="Submit"
          onOk={handleCreateUser}
          onCancel={handleCloseCreate}
        >
          <FormUser
            register={register}
            title="Create User"
            type_field="create"
          ></FormUser>
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageUsers;
