import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
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
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // State cho phân trang
  const { contextHolder, handleRemove } = useModelRemove();
  const { register, setValue, reset, getValues, control } = useForm();

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
        return <CountUp start={0} end={item.length}></CountUp>;
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

  useEffect(() => {
    const fetchPermissionRole = async () => {
      try {
        const urlRoles = `${process.env.REACT_APP_HOST_BACKEND}/roles`;
        const urlPermission = `${process.env.REACT_APP_HOST_BACKEND}/permissions`;
        const access_token = localStorage.getItem("access_token");
        const responseRole = await axios.get(urlRoles, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const responsePermisison = await axios.get(urlPermission, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        setData({
          Role: responseRole.data.data,
          Permission: responsePermisison.data.data,
        });
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchPermissionRole();
  }, []);

  // Xử lý khi thay đổi phân trang
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleResetRoleForm = () => {
    data.Permission.map((item, index) => {
      setValue(item._id, false);
    });
    reset({ name: "" });
  };

  const handleRole = async ({ method, message_error, message_success }) => {
    const permissions_arr = [];
    data.Permission.map((item, index) => {
      getValues(item._id) && permissions_arr.push(item._id);
      console.log("getValues(item._id): ", getValues(item._id));
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
      const access_token = localStorage.getItem("access_token");
      const response =
        method === "create"
          ? await axios.post(url, DataRole, config)
          : await axios.put(url, DataRole, config);

      toast.success(message_success);
    } catch (error) {
      console.log("error: ", error);
      toast.error(message_error);
    }
    data.Permission.map((item, index) => {
      setValue(item._id, false);
    });
    handleResetRoleForm();
    handleCloseAll();
  };
  return (
    <div>
      <div className="flex justify-end items-end">
        <ButtonTemplate
          onClick={() => {
            data.Permission.map((item, index) => {
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
        <Table
          bordered
          columns={columns}
          dataSource={data.Role}
          onChange={handleTableChange}
        />

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
            permissions={data?.Permission}
            title="create role"
            register={register}
            control={control}
          ></FormRole>
          {/* <FormCategoryRole title="Create Role"></FormCategoryRole> */}
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageRoles;
