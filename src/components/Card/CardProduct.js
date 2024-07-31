import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { formatPrice } from "../../pages/Detail";
import { Space } from "antd";
import { NavLink } from "react-router-dom";
const CardProduct = ({ image, title, price, id }) => {
  return (
    <NavLink to={`/product/${id}`}>
      <div className="border-2 border-gray-300 hover:shadow-lg rounded-md overflow-hidden bg-white py-3 px-3 group relative scale-100 hover:scale-x-105 hover:scale-y-105 hover:border-[rgba(15,22,84,1)]">
        <div className="h-[200px] overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover rounded-md transform transition-transform duration-300 scale-100 group-hover:scale-125"
            src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${image[0].name}`}
            alt="Notfound"
          />
        </div>
        <div className="mt-3">
          <h1 className="line-clamp-2 h-[50px] ">{title}</h1>
          <h1 className="font-bold text-red-600 text-xl">
            <Space>
              <span>{formatPrice(price)}</span>
              <span>VND</span>
            </Space>
          </h1>
          <button className="bg-[#fb5531] text-white w-full h-[40px] rounded-md mt-2 font-semibold z-50">
            Mua ngay
          </button>
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
