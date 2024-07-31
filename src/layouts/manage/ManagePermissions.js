import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Space, Table } from "antd";
import ButtonTemplate from "../../components/ButtonTemplate";
import useModelControl from "../../hooks/useModelControl";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns"; // Import hàm format từ thư viện date-fns
import slugify from "slugify"; // Import slugify từ thư viện slugify
import useModelRemove from "../../hooks/useModelRemove";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormPermission from "../../components/Form/FormPermission";
import { useForm } from "react-hook-form";

const ManagePermissions = () => {
  const {
    dataEdit,
    handleOpenEdit,
    handleCloseAll,
    isOpenEdit,
    isOpenCreate,
    handleOpenCreate,
  } = useModelControl();
  const [dataPermission, setDataPermission] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // State cho phân trang
  const { contextHolder, handleRemove } = useModelRemove();
  const { register, setValue, getValues, reset } = useForm();

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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Path",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      sorter: (a, b) => a.method.localeCompare(b.method),
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      sorter: (a, b) => a.module.localeCompare(b.module),
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
          <Space size="middle">
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
                const url = `${process.env.REACT_APP_HOST_BACKEND}/permissions/${item._id}`;
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

  const defaultCheckedList = [
    "stt",
    "name",
    "method",
    "module",
    "apiPath",
    "createdAt",
    "description",
    "createdBy",
    "updatedAt",
    "action",
  ];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  useEffect(() => {
    const fetchPermission = async () => {
      const url = `${process.env.REACT_APP_HOST_BACKEND}/permissions`;
      const response = await axios.get(url);
      setDataPermission(response.data.data);
    };
    fetchPermission();
  }, [dataPermission]);

  // Xử lý khi thay đổi phân trang
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleResestPermissionForm = () => {
    reset({
      name: "",
      apiPath: "",
      module: "",
      method: "",
    });
  };

  const handlePermission = async ({
    method,
    message_success,
    message_error,
  }) => {
    const DataPermissions = {
      name: getValues("name"),
      apiPath: getValues("apiPath"),
      module: getValues("module"),
      method: getValues("method"),
      description: slugify(getValues("name"), {
        lower: true,
        replacement: "_",
      }),
    };

    const access_token = localStorage.getItem("access_token");
    const url =
      method === "create"
        ? `${process.env.REACT_APP_HOST_BACKEND}/permissions`
        : `${process.env.REACT_APP_HOST_BACKEND}/permissions/${dataEdit._id}`;
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response =
        method === "create"
          ? await axios.post(url, DataPermissions, config)
          : await axios.put(url, DataPermissions, config);
      toast.success(message_success);
    } catch (error) {
      console.log("error: ", error);
      toast.error(message_error);
    }
    handleResestPermissionForm();
    handleCloseAll();
  };

  return (
    <div>
      <div className="flex justify-between items-end">
        <Checkbox.Group
          value={checkedList}
          options={options}
          onChange={(value) => {
            setCheckedList(value);
          }}
        />
        <ButtonTemplate
          onClick={() => {
            handleResestPermissionForm();
            handleOpenCreate();
          }}
        >
          <span>Create category</span>
          <span>
            <i className="fa-solid fa-user-plus"></i>
          </span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Table
          bordered
          columns={newColumns}
          dataSource={dataPermission}
          onChange={handleTableChange}
        />
        <Modal
          title="Update Permission"
          open={isOpenEdit}
          onOk={() =>
            handlePermission({
              method: "update",
              message_success: "Cập nhật thành công!",
              message_error: "Cập nhật thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormPermission
            register={register}
            title="Update Permission"
          ></FormPermission>
        </Modal>

        <Modal
          okText="Submit"
          title="Create Permission"
          open={isOpenCreate}
          onOk={() =>
            handlePermission({
              method: "create",
              message_success: "Tạo mới thành công",
              message_error: "Tạo mới thất bại!",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormPermission
            register={register}
            title="Create Permission"
          ></FormPermission>
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManagePermissions;
