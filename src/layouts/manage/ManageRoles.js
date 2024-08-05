import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import ButtonTemplate from "../../components/ButtonTemplate";
import useModelControl from "../../hooks/useModelControl";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns"; // Import hàm format từ thư viện date-fns
import useModelRemove from "../../hooks/useModelRemove";
import CountUp from "react-countup";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import FormRole from "../../components/Form/FormRole";
import { useForm } from "react-hook-form";

const ManageRoles = () => {
  const {
    dataEdit,
    handleOpenEdit,
    isOpenEdit,
    isOpenCreate,
    handleCloseAll,
    handleOpenCreate,
  } = useModelControl();
  const [data, setData] = useState({
    Role: [],
    Permission: [],
    isLoading: true,
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // State cho phân trang
  const { contextHolder, handleRemove } = useModelRemove();
  const { register, setValue, reset, getValues, control } = useForm();

  const fetchPermissionRole = async (currentPage = 1, pageSize = 10) => {
    setData((prevData) => ({ ...prevData, isLoading: true }));
    try {
      const urlRoles = `${process.env.REACT_APP_HOST_BACKEND}/roles?current=${currentPage}&limit=${pageSize}`;
      const urlPermission = `${process.env.REACT_APP_HOST_BACKEND}/permissions`;
      const access_token = localStorage.getItem("access_token");
      const [responseRole, responsePermission] = await Promise.all([
        axios.get(urlRoles, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
        axios.get(urlPermission, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
      ]);

      setData({
        Role: responseRole.data.data,
        Permission: responsePermission.data.data,
        isLoading: false,
      });
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: responseRole.data.total,
      }));
    } catch (error) {
      console.log("error: ", error);
      setData((prevData) => ({ ...prevData, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchPermissionRole(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleResetRoleForm = () => {
    data.Permission.forEach((item) => {
      setValue(item._id, false);
    });
    reset({ name: "" });
  };

  const handleRole = async ({ method, message_error, message_success }) => {
    const permissions_arr = [];
    data.Permission.forEach((item) => {
      getValues(item._id) && permissions_arr.push(item._id);
    });

    const DataRole = {
      name: getValues("name"),
      permissions: permissions_arr,
    };
    const url =
      method === "create"
        ? `${process.env.REACT_APP_HOST_BACKEND}/roles`
        : `${process.env.REACT_APP_HOST_BACKEND}/roles/${dataEdit._id}`;
    const access_token = localStorage.getItem("access_token");
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      await axios({
        method: method === "create" ? "post" : "put",
        url,
        data: DataRole,
        ...config,
      });

      toast.success(message_success);
      fetchPermissionRole(pagination.current, pagination.pageSize); // Fetch lại dữ liệu sau khi tạo mới hoặc cập nhật
    } catch (error) {
      console.log("error: ", error);
      toast.error(message_error);
    }
    handleResetRoleForm();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Size Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (item) => {
        return <span>{item.length}</span>;
      },
    },
    {
      title: "Status",
      render: (text) => (
        <span>
          <Tag icon={<CheckCircleOutlined />} color="success">
            Active
          </Tag>
        </span>
      ),
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
                data.Permission.map((item, index) => {
                  setValue(item._id, false);
                });

                setValue("name", item.name);
                item.permissions.map((item, index) => {
                  setValue(item, true);
                });
                handleOpenEdit(item);
              }}
              type="link"
              icon={<EditOutlined style={{ color: "orange" }} />}
            />
            <Button
              onClick={() => {
                const url = `${process.env.REACT_APP_HOST_BACKEND}/roles/${item._id}`;
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

  return (
    <div>
      <div className="flex justify-end items-end">
        <ButtonTemplate
          onClick={() => {
            data.Permission.forEach((item) => {
              setValue(item._id, false);
            });
            setValue("name", "");
            handleOpenCreate();
          }}
        >
          <span>Create Role</span>
          <span>
            <i className="fa-solid fa-user-plus"></i>
          </span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Spin spinning={data.isLoading}>
          <Table
            bordered
            columns={columns}
            dataSource={data.Role}
            onChange={handleTableChange}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
            }}
          />
        </Spin>

        <Modal
          width="70%"
          title="Update Role"
          open={isOpenEdit}
          onOk={() =>
            handleRole({
              method: "update",
              message_success: "Cập nhật thành công!",
              message_error: "Cập nhật thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormRole
            register={register}
            control={control}
            permissions={data.Permission}
          ></FormRole>
        </Modal>

        <Modal
          width="70%"
          okText="Submit"
          title="Create Role"
          open={isOpenCreate}
          onOk={() =>
            handleRole({
              method: "create",
              message_success: "Tạo mới thành công!",
              message_error: "Tạo mới thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormRole
            permissions={data.Permission}
            title="create role"
            register={register}
            control={control}
          ></FormRole>
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageRoles;
