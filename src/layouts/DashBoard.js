import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DashBoard = () => {
  return (
    <div>
      <div className="bg-[#fb5531]">
        <Header></Header>
      </div>
      <div className="w-[70%] mx-auto rounded-xl">
        <Outlet />
      </div>
      <div className="bg-[#fafafa] ">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default DashBoard;
