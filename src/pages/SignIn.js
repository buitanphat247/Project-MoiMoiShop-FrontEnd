import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginFetch } from "../slices/authSlice";
import { toast } from "react-toastify";
import { NavLink } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (userInfo) => {
    const response = await dispatch(userLoginFetch(userInfo));
    const status_login = response.payload.status;
    if (status_login === 201) {
      toast.success("Login success");
      navigate("/");
    }
  };

  return (
    <div className="h-[100vh]">
      <div className="w-[80%] mx-auto">
        <div className="flex items-end gap-x-10 py-5">
          <h1 className="font-bold text-[#fb5531] text-4xl">MoiMoi Shop</h1>
          <h2 className="text-xl font-semibold">Đăng nhập</h2>
        </div>
      </div>

      <div className="w-full flex items-center justify-center bg-[#fb5531] py-[100px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="h-full w-[450px] bg-white px-8 py-10 rounded-md shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Đăng Nhập</h2>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("username")}
              defaultValue="tan1@gmail.com" // Giá trị mặc định cho
              placeholder="Enter your email address..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              placeholder="Enter your password..."
              defaultValue="123456"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-2"
          >
            Đăng Nhập
          </button>
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
              Bạn mới biết đến MoiMoi Shop?
              <a href="#" className="text-red-500 hover:text-red-700">
                Đăng ký
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
