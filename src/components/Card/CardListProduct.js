import React from "react";
import CardProduct from "./CardProduct";
import { NavLink } from "react-router-dom";
import { Flex, Spin } from "antd";

const CardListProduct = ({ title_menu_product, data, isLoading }) => {
  return (
    <>
      <div className="font-bold mt-5 p-2 capitalize text-lg ">
        <h1 className="text-xl">{title_menu_product}</h1>
      </div>
      <div className="grid grid-cols-5 gap-x-3 gap-y-5 mt-1">
        {!isLoading ? (
          data?.slice(0, 10).map((item, index) => {
            return (
              <CardProduct
                image={item.images}
                title={item.name}
                id={item._id}
                key={item._id} // Sử dụng một key duy nhất và duy nhất như _id là tốt nhất
                price={item.price}
              />
            );
          })
        ) : (
          <div className="col-span-5 flex items-center justify-center h-[350px]">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        )}
      </div>
      {!isLoading && (
        <NavLink
          to="/product"
          className="w-[30%] border-2 border-[rgba(15,22,84,1)] font-semibold rounded-md h-[50px] capitalize mt-5 mx-auto  bg-white flex items-center justify-center"
        >
          Xem tất cả sản phẩm
        </NavLink>
      )}
    </>
  );
};

export default CardListProduct;
