import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Banner from "../layouts/Banner";
import CardListProduct from "../components/Card/CardListProduct";
import axios from "axios";

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

export const list_phones_of_company = [
  {
    name: "Apple",
    country: "USA",
  },
  {
    name: "Samsung",
    country: "South Korea",
  },
  {
    name: "Huawei",
    country: "China",
  },
  {
    name: "Xiaomi",
    country: "China",
  },
  {
    name: "OnePlus",
    country: "China",
  },
  {
    name: "Google",
    country: "USA",
  },
  {
    name: "Sony",
    country: "Japan",
  },
  {
    name: "LG",
    country: "South Korea",
  },
  {
    name: "Motorola",
    country: "USA",
  },
  {
    name: "Nokia",
    country: "Finland",
  },
  {
    name: "HTC",
    country: "Taiwan",
  },
  {
    name: "BlackBerry",
    country: "Canada",
  },
  {
    name: "Lenovo",
    country: "China",
  },
  {
    name: "Asus",
    country: "Taiwan",
  },
  {
    name: "ZTE",
    country: "China",
  },
  {
    name: "Meizu",
    country: "China",
  },
  {
    name: "Oppo",
    country: "China",
  },
  {
    name: "Vivo",
    country: "China",
  },
  {
    name: "Sharp",
    country: "Japan",
  },
  {
    name: "Panasonic",
    country: "Japan",
  },
  {
    name: "TCL",
    country: "China",
  },
  {
    name: "Realme",
    country: "China",
  },
  {
    name: "Honor",
    country: "China",
  },
  {
    name: "Black Shark",
    country: "China",
  },
  {
    name: "Redmi",
    country: "China",
  },
  {
    name: "POCO",
    country: "China",
  },
  {
    name: "Infinix",
    country: "Hong Kong",
  },
  {
    name: "Tecno Mobile",
    country: "China",
  },
  {
    name: "Coolpad",
    country: "China",
  },
  {
    name: "Micromax",
    country: "India",
  },
];
