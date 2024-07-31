import React, { useState } from "react";
import { Nav, NavbarToggle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropdown } from "flowbite-react";
import { userLogoutFetch } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Modal } from "antd";

const list_menu = {
  contain_left: [
    {
      name: "Home",
      href: "/",
      target: "",
    },
    {
      name: "Product",
      href: "/product",
      target: "",
    },

    {
      name: "News",
      href: "/",
      target: "",
    },
    {
      name: "Contact",
      href: "https://www.facebook.com/btanphat",
      target: "_blank",
    },
    {
      name: "About",
      href: "/about",
      target: "",
    },
  ],
  contain_right: [
    {
      name: "hỗ trợ",
      icon: <i className="fa-regular fa-circle-question"></i>,
      href: "",
    },
    {
      name: "đăng nhập",
      href: "/login",
    },
    {
      name: "đăng kí",
      href: "",
    },
    {
      name: "Tài khoản",
      href: "/account",
    },
    {
      name: "đăng xuất",
      href: "/logout",
    },
  ],
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    display: flex;
    gap: 20px;
    text-transform: capitalize;
  }
`;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [modal, contextHolder] = Modal.useModal();
  const handleClick = () => {
    console.log("check click");
  };
  const handleAccount = () => {
    navigate("/admin");
  };
  const handleLogout = async () => {
    await modal.confirm({
      title: "Đăng Xuất",
      content: <>Xác nhận đăng xuất khỏi tài khoản!</>,
      okText: "Submit",
      onOk: async () => {
        const response = await dispatch(userLogoutFetch());
        const status_login = response.payload.status;
        if (status_login === 201) {
          toast.success("Logout success");
          navigate("/");
        } else {
          toast.error("Logout error");
        }
      },
    });

    // const response = await dispatch(userLogoutFetch());
    // const status_login = response.payload.status;
    // if (status_login === 201) {
    //   toast.success("Logout success");
    //   navigate("/");
    // }
  };
  return (
    <>
      <div className="w-[70%] mx-auto pt-2 pb-5">
        {contextHolder}
        <StyledDiv className=" text-white">
          <ul>
            {list_menu.contain_left.map((item, index) => (
              <li key={item.index}>
                <NavLink
                  to={item.href}
                  className="hover:underline"
                  target={item.target}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="flex items-center">
            {list_menu.contain_right.slice(0, 1).map((item, index) => (
              <li key={item.index} className="cursor-pointer select-none">
                {item.name}
                {` `}
                {item.icon}
              </li>
            ))}

            {(isAuthenticated === false || isAuthenticated === null) &&
              list_menu.contain_right.slice(1, 3).map((item, index) => (
                <li key={item.index}>
                  <NavLink to={item.href}>
                    {item.name}
                    {` `}
                    {item?.icon}
                  </NavLink>
                </li>
              ))}

            {isAuthenticated === true &&
              list_menu.contain_right.slice(3, 5).map((item, index) => (
                <li
                  key={item.index}
                  onClick={
                    (item.href === "/account" && handleAccount) ||
                    (item.href === "/logout" && handleLogout)
                  }
                >
                  <NavLink>
                    {item.name}
                    {` `}
                    {item?.icon}
                  </NavLink>
                </li>
              ))}
          </ul>
        </StyledDiv>
        <ul className="flex mt-5 gap-x items-center justify-center gap-x-[20px] h-[50px] text-white">
          <li className="text-3xl font-bold">
            <NavLink to="/">MoiMoi Shop</NavLink>
          </li>

          <li className="flex-1  w-full h-full relative">
            <input
              type="text"
              className="rounded-md px-3 w-full h-full text-black"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <div className="absolute right-0 top-0 bg-white w-[100px] h-full border-4 border-white rounded-md">
              <i className="fa-solid fa-magnifying-glass bg-[#fb5531] w-full h-full flex items-center justify-center rounded-md"></i>
            </div>
          </li>
          {isAuthenticated && (
            <li className="h-full w-[50px]">
              <NavLink
                to="/order"
                className="flex items-center justify-center h-full w-full"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
