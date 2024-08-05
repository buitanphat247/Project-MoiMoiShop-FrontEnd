import React from "react";
import Field from "../Field/FieldInput";
import { Space } from "antd";

const FormSignIn = ({ register }) => {
  return (
    <form autoComplete="off" className="h-full  bg-white ">
      <Field
        label={"Email"}
        name="email"
        register={register}
        placeholder="Enter your email address..."
      ></Field>
      <Field
        label={"Password"}
        name="password"
        placeholder="Enter your password..."
        register={register}
      ></Field>

      <ul className="flex items-center justify-between text-sm text-[#0055aa] font-semibold mb-5">
        <li>
          <a href="">Quên mật khẩu</a>
        </li>
        <li>
          <a href="">Đăng nhập với SMS</a>
        </li>
      </ul>
      <div className="flex items-center justify-center mb-5">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="mx-3 text-gray-500">HOẶC</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="flex space-x-4 mb-5">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Facebook
        </button>
        <button className="w-full items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Google
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          <Space>
            <span>Bạn mới biết đến MoiMoi Shop?</span>
            <a href="#" className="text-red-500 hover:text-red-700">
              Đăng ký
            </a>
          </Space>
        </p>
      </div>
    </form>
  );
};

export default FormSignIn;
