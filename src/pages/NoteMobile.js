import { Spin } from "antd";
import React from "react";

const NoteMobile = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[100vh] bg-gray-100">
        <div className="bg-white p-8 rounded-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Vui lòng sử dụng máy tính để vào trang web!
          </h1>
          <p className="text-gray-600">
            Trang web này không hỗ trợ trên thiết bị di động. Hãy thử lại trên
            máy tính để có trải nghiệm tốt nhất.
          </p>
          <div className="mt-5">
            <Spin size="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteMobile;
