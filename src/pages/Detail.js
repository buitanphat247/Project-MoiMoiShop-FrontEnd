import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Flex, notification, Rate, Space, Spin, Tabs } from "antd";
import CardListProduct from "../components/Card/CardListProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import DetailPicture from "../layouts/detail/DetailPicture";
import DetailCategory from "../layouts/detail/DetailCategory";
import DetailBox from "../layouts/detail/DetailBox";
import DetailAction from "../layouts/detail/DetailAction";
import DetailTabs from "../layouts/detail/DetailTabs";

const { parseDOM } = require("htmlparser2");

export const formatPrice = (price) => {
  if (!price) return ""; // Kiểm tra nếu không có giá trị
  // Sử dụng Number.prototype.toFixed để làm tròn và định dạng giá trị
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const Detail = () => {
  let { id } = useParams();
  const [data, setData] = useState({
    Detail: {},
    ProductPhone: [],
    ProductLaptop: [],
    isLoading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      setData({ ...data, isLoading: true });
      const access_token = localStorage.getItem("access_token");
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
        withCredentials: true,
      };

      const urls = [
        `${process.env.REACT_APP_HOST_BACKEND}/products/${id}`,
        `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2e99961853fec8c7b3dd`,
        `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2ea9961853fec8c7b3df`,
      ];

      try {
        const [responseDetail, responsePhone, responseLaptop] =
          await Promise.all(urls.map((url) => axios.get(url, config)));

        setData({
          Detail: responseDetail.data.data,
          ProductPhone: responsePhone.data.data.result,
          ProductLaptop: responseLaptop.data.data.result,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mt-5 bg-white p-5 rounded-md">
      {!data.isLoading ? (
        <>
          <div className="flex items-end justify-between border-b py-2">
            <div>
              <h1 className="text-xl font-bold capitalize text-gray-800">
                {data?.Detail?.name}
              </h1>
              <Flex gap="middle" align="end" className="mt-1">
                <Rate disabled defaultValue={5} className="text-sm" />
                <p className="text-sm">0 Đánh giá</p>{" "}
                <h1 className="text-xl font-bold text-[#fb5531] flex items-center">
                  <Space>
                    <span>{formatPrice(data?.Detail?.price)}</span>
                    <span>VND</span>
                  </Space>
                </h1>
              </Flex>
            </div>
            <div className="flex flex-col text-sm gap-y-2">
              <button className="bg-blue-600 text-white rounded-sm gap-x-2 flex items-center px-2">
                <span role="img" aria-label="thumbs up">
                  <i className="fa-regular fa-thumbs-up"></i>
                </span>
                <span>Thích 3,2K</span>
              </button>
              <button className="bg-blue-600 text-white  rounded-sm">
                Chia sẻ
              </button>
            </div>
          </div>

          <div className="flex overflow-hidden gap-x-5 mt-3">
            <DetailPicture images={data?.Detail?.images}></DetailPicture>
            <div className="flex-1">
              <DetailAction data={data} id={id}></DetailAction>
              <DetailCategory data={data?.Detail}></DetailCategory>
            </div>
          </div>
          <DetailTabs data={data?.Detail}></DetailTabs>
        </>
      ) : (
        <div className="col-span-5 flex items-center justify-center h-[80vh]">
          <Spin tip="Loading" size="large"></Spin>
        </div>
      )}
      <CardListProduct
        data={data.ProductLaptop}
        isLoading={data.isLoading}
        title_menu_product="máy tính"
      ></CardListProduct>
      <CardListProduct
        data={data.ProductPhone}
        isLoading={data.isLoading}
        title_menu_product="điện thoại"
      ></CardListProduct>
    </div>
  );
};

export default Detail;
