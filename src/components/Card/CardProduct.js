import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatPrice } from "../../pages/Detail";
import { Flex, Space } from "antd";
import { NavLink } from "react-router-dom";
const CardProduct = ({ image, title, price, id, discount }) => {
  return (
    <NavLink to={`/product/${id}`}>
      <div className="border-2  hover:shadow-lg rounded-sm overflow-hidden bg-white py-3 px-3 group relative scale-100 hover:scale-x-105 hover:scale-y-105 hover:border-[rgba(15,22,84,1)]">
        <div className="overflow-hidden">
          <img
            className="relative w-full h-full object-contain  transform transition-transform duration-300 "
            src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${image[0].name}`}
            alt="Notfound"
          />
          <div className="absolute w-[40px] h-[40px] bg-white top-4 right-4 border-[#0f1654] text-xl flex items-center justify-center rounded-full border">
            <i className="fa-regular fa-heart"></i>
          </div>
          <p className="absolute text-white top-4 left-4 font-semibold text-sm px-1 bg-[#fb5531] flex items-center justify-center rounded-full">
            -{discount}%
          </p>
        </div>
        <div className="mt-3">
          <h1 className="line-clamp-2 h-[50px] ">{title}</h1>
          <h1 className="font-bold text-red-600 text-lg">
            <Space>
              <span>{formatPrice(price)}</span>
              <span>VND</span>
            </Space>
          </h1>
          <Flex gap="small">
            <button className="bg-blue-500 text-white w-full h-[40px] rounded-sm mt-2 font-semibold z-50">
              Add To Cart
            </button>
            <button className="bg-[#fb5531] text-white w-full h-[40px] rounded-sm mt-2 font-semibold z-50">
              Buy Now
            </button>
          </Flex>
        </div>
        <div className="mt-3 flex justify-end">
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={0}
              precision={0.5}
              readOnly
            />
          </Stack>
        </div>
      </div>
    </NavLink>
  );
};

export default CardProduct;
