import React, { useEffect, useState } from "react";
import Banner from "../layouts/Banner";
import CardListProduct from "../components/Card/CardListProduct";
import axios from "axios";
import { scrollToTop } from "../config/ScrollToTop";

const Home = () => {
  const [data, setData] = useState({
    ProductLatest: [],
    ProductPhone: [],
    ProductLaptop: [],
    isLoading: true,
  });
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
      const url_product_latest = `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&sort=-createdAt`;
      const url_product_phone = `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2e99961853fec8c7b3dd`;
      const url_product_laptop = `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2ea9961853fec8c7b3df`;
      // handle response
      const response_product_latest = await axios.get(
        url_product_latest,
        config
      );
      const response_product_phone = await axios.get(url_product_phone, config);
      const response_product_laptop = await axios.get(
        url_product_laptop,
        config
      );
      setData({
        ProductLatest: response_product_latest.data.data.result,
        ProductPhone: response_product_phone.data.data.result,
        ProductLaptop: response_product_laptop.data.data.result,
        isLoading: false,
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <Banner></Banner>

      <CardListProduct
        data={data.ProductLatest}
        title_menu_product="mới nhất"
        isLoading={data.isLoading}
        img_href="img_accessory"
      ></CardListProduct>

      <CardListProduct
        data={data.ProductPhone}
        isLoading={data.isLoading}
        title_menu_product="điện thoại"
        img_href="img_mobile"
      ></CardListProduct>

      <CardListProduct
        data={data.ProductLaptop}
        isLoading={data.isLoading}
        title_menu_product="Máy tính"
        img_href="img_mobile"
      ></CardListProduct>
    </>
  );
};

export default Home;
