import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table } from "antd";
import ButtonTemplate from "../../components/ButtonTemplate";
import useModelControl from "../../hooks/useModelControl";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns"; // Import hàm format từ thư viện date-fns
import useModelRemove from "../../hooks/useModelRemove";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import FormProduct from "../../components/Form/FormProduct";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setNewListImage } from "../../slices/fileSlice";
import { setContentEditor } from "../../slices/editorSlice";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../pages/Detail";
import api from "../../config/api";

const ManageProducts = () => {
  const {
    dataEdit,
    handleOpenEdit,
    isOpenEdit,
    isOpenCreate,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseAll,
  } = useModelControl();
  const [data, setData] = useState({
    categories: [],
    products: [],
    meta: {},
    isLoading: true,
  });
  const { register, getValues, control, reset, setValue } = useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  }); // State cho phân trang
  const { contextHolder, handleRemove } = useModelRemove();
  const { image } = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content_editor } = useSelector((state) => state.editor);

  const fetchData = async (currentPage = 1, pageSize = 10) => {
    setData((prevData) => ({ ...prevData, isLoading: true }));
    const url_categories = `/categories`;
    const url_products = `/products?current=${currentPage}&limit=${pageSize}`;
    try {
      const [response_categories, response_products] = await Promise.all([
        api.get(url_categories),
        api.get(url_products),
      ]);
      setData({
        categories: response_categories.data.data.result,
        products: response_products.data.data.result,
        meta: response_products.data.data.meta,
        isLoading: false,
      });
      setPagination({
        current: response_products.data.data.meta.current,
        pageSize: response_products.data.data.meta.pageSize,
        total: response_products.data.data.meta.total,
      });
    } catch (error) {
      console.error("Error fetching categories and products:", error);
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
    dispatch(setNewListImage([]));
    dispatch(setContentEditor(""));
    reset({
      name: "",
      quantity: "",
      price: "",
      discount: "",
      category: "",
    });
  };

  const handleCreateProduct = async ({
    method,
    message_success,
    message_error,
  }) => {
    const dataProduct = {
      name: getValues("name"),
      quantity: getValues("quantity"),
      price: getValues("price"),
      discount: getValues("discount"),
      category: getValues("category").value,
      description: content_editor,
      images: image,
    };

    try {
      const access_token = localStorage.getItem("access_token");
      const url =
        method === "create"
          ? `${process.env.REACT_APP_HOST_BACKEND}/products`
          : `${process.env.REACT_APP_HOST_BACKEND}/products/${dataEdit._id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };
      await axios({
        method: method === "create" ? "post" : "put",
        url,
        data: dataProduct,
        ...config,
      });
      toast.success(message_success);
      fetchData(pagination.current, pagination.pageSize); // Fetch lại dữ liệu sau khi tạo mới hoặc cập nhật
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
      title: "ID",
      key: "_id",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (item) => (
        <span>
          <Space>
            <span>{formatPrice(item)}</span>
            <span>VND</span>
          </Space>
        </span>
      ),
    },
    {
      title: "Quanlity",
      dataIndex: "quanlity",
      key: "quanlity",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (item) => <span>{item}</span>,
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
      render: (item, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => navigate(`/product/${item._id}`)}
            icon={<EyeOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => {
              Object.keys(item).forEach((key) => {
                setValue(key, item[key]);
              });
              data.categories.map((category_item, index) => {
                if (category_item._id === item.category) {
                  setValue("category", {
                    label: category_item.name,
                    value: category_item._id,
                  });
                }
              });
              dispatch(setNewListImage(item.images));
              dispatch(setContentEditor(item.description));
              handleOpenEdit(item);
            }}
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
          />
          <Button
            onClick={async () => {
              const url = `${process.env.REACT_APP_HOST_BACKEND}/products/${item._id}`;
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
          <span>Create Product</span>
        </ButtonTemplate>
      </div>
      <div className="mt-5">
        <Spin spinning={data?.isLoading}>
          <Table
            bordered
            columns={columns}
            dataSource={data.products}
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
          title="Update Products"
          open={isOpenEdit}
          width="70%"
          onOk={() =>
            handleCreateProduct({
              method: "update",
              message_success: "Cập nhật thành công",
              message_error: "Cập nhật thất bại",
            })
          }
          onCancel={handleCloseAll}
        >
          <FormProduct
            register={register}
            title="update product"
            control={control}
            categories={data.categories}
          />
        </Modal>
        <Modal
          okText="Submit"
          title="Create Product"
          width="70%"
          open={isOpenCreate}
          onOk={() =>
            handleCreateProduct({
              method: "create",
              message_success: "Tạo mới thành công",
              message_error: "Tạo mới thất bại",
            })
          }
          onCancel={handleCloseCreate}
        >
          <FormProduct
            register={register}
            control={control}
            categories={data.categories}
            title="create product"
          />
        </Modal>
        {contextHolder}
      </div>
    </div>
  );
};

export default ManageProducts;
