import React, { useEffect, useState } from "react";
import { Select, Spin, Pagination as AntdPagination } from "antd";
import { Button } from "antd";
import CardProduct from "../components/Card/CardProduct";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetQuery } from "../slices/querySlice";
import api from "../config/api";

const Product = () => {
  const [data, setData] = useState({
    Product: [],
    Meta: {},
    Categories: [],
    isLoading: true,
  });
  const { query } = useSelector((state) => state.query);
  const [filter, setFilter] = useState({
    sort: "",
    categoryPath: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const { control, setValue } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setData({
        ...data,
        isLoading: true,
      });
      const access_token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };
      const urlProduct = `/products?current=${currentPage}&limit=${itemsPerPage}&sort=${filter.sort}&category=${filter.categoryPath}&name=/${query}/i`;
      const urlCategory = `/categories`;
      const responseProduct = await api.get(urlProduct);
      console.log("responseProduct: ", responseProduct);
      const responseCategory = await api.get(urlCategory);
      setData({
        Product: responseProduct.data.data.result,
        Meta: responseProduct.data.data.meta,
        Categories: responseCategory.data.data.result,
        isLoading: false,
      });
    };
    fetchData();
  }, [currentPage, filter, query]); // Fetch dữ liệu mỗi khi currentPage thay đổi
  const optionsCategories = [{ value: "", label: "Sản Phẩm" }].concat(
    data.Categories.map((item) => ({
      value: item._id,
      label: <span className="capitalize">{item.name}</span>,
    }))
  );

  return (
    <>
      <div className="flex items-center justify-between bg-[#e5e5e5] p-3 rounded-md mt-5">
        <div className="flex items-center gap-x-3">
          <span className="text-gr  ay-700">Sắp xếp theo:</span>
          <>
            <Controller
              name={"filter"}
              control={control}
              render={({ field }) => (
                <Select
                  disabled={data.isLoading}
                  {...field}
                  defaultValue={filter.sort}
                  className="min-w-[200px]"
                  onChange={(value) => {
                    setValue("filter", value);
                    setFilter({ ...filter, sort: value });
                  }}
                  options={[
                    { value: "", label: "Bộ Lọc" },
                    { value: "-createdAt", label: "Mới Nhất" },
                    { value: "+price", label: "Giá: Thấp đến cao" },
                    { value: "-price", label: "Giá: Cao đến thấp" },
                  ]}
                />
              )}
            />
            <Controller
              name={"categoryPath"}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={data.isLoading}
                  defaultValue={filter.categoryPath}
                  onChange={(value) => {
                    setValue("categoryPath", value);
                    setFilter({ ...filter, categoryPath: value });
                  }}
                  className="min-w-[200px]"
                  options={optionsCategories}
                />
              )}
            />
            <Button
              disabled={
                data.isLoading ||
                (filter.sort === "" &&
                  filter.categoryPath === "" &&
                  query === "")
              }
              onClick={() => {
                setValue("categoryPath", "");
                setValue("filter", "");
                setFilter({ sort: "", categoryPath: "" });
                dispatch(
                  resetQuery({
                    query: "",
                    queryChange: "",
                  })
                );
              }}
            >
              <i className="fa-regular fa-trash-can"></i>
            </Button>
          </>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-x-3 gap-y-5 mt-5">
        {!data.isLoading ? (
          data?.Product?.map((item) => (
            <CardProduct
              image={item.images}
              title={item.name}
              id={item._id}
              key={item._id}
              price={item.price}
              discount={item.discount}
            />
          ))
        ) : (
          <div className="col-span-5 flex items-center justify-center h-[30vh]">
            <Spin tip="Loading" size="large" />
          </div>
        )}
      </div>
      {!data.isLoading && (
        <div className="flex items-center justify-center mt-5">
          <AntdPagination
            current={currentPage}
            total={data?.Meta?.total}
            pageSize={itemsPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default Product;
