import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userLoginFetch, userLogoutFetch } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Modal, Space } from "antd";
import FormSignIn from "../components/Form/FormSignIn";
import { useForm } from "react-hook-form";
import CardProfile from "../components/Card/CardProfile";
import { setQuery, setQueryChange } from "../slices/querySlice";

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
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const [modal, contextHolder] = Modal.useModal();
  const { register, getValues, setValue } = useForm();
  const { queryChange } = useSelector((state) => state.query);
  const handleClick = () => {
    console.log("check click");
  };
  const handleAccount = async () => {
    await modal.info({
      title: "Profile",
      width: "25%",
      content: <CardProfile user={currentUser}></CardProfile>,
      okText: "Submit",
    });
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
  };
  const handleLogin = async () => {
    await modal.confirm({
      title: "Sign In",
      content: <FormSignIn register={register}></FormSignIn>,
      okText: "Submit",
      width: "30%",
      onOk: async () => {
        const userInfo = {
          username: getValues("email").trim(),
          password: getValues("password").trim(),
        };
        const response = await dispatch(userLoginFetch(userInfo));
        const status_login = response.payload.status;
        if (status_login === 201) {
          toast.success("Login success");
          navigate("/");
          setValue("email", "");
          setValue("password", "");
        } else {
          toast.error("Login Error");
          setValue("email", "");
          setValue("password", "");
        }
      },
    });
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

            {/* status non login */}
            {(isAuthenticated === false || isAuthenticated === null) &&
              list_menu.contain_right.slice(1, 3).map((item, index) => {
                return (
                  <li
                    key={item.index}
                    onClick={item.href === "/login" && handleLogin}
                  >
                    <NavLink>
                      <Space>
                        <span>{item.name}</span>
                        <span>{item?.icon}</span>
                      </Space>
                    </NavLink>
                  </li>
                );
              })}

            {/* status login success */}
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
                    <Space>
                      <span>{item.name}</span>
                      <span>{item?.icon}</span>
                    </Space>
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
              autoComplete="off"
              {...register("query")}
              value={queryChange}
              onChange={(e) => {
                dispatch(setQueryChange(e.target.value));
              }}
              type="text"
              className="rounded-md px-3 w-full h-full text-black focus:outline-none focus:ring-2 focus:ring-[#0f1654] transition-all"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <div
              onClick={() => {
                dispatch(setQuery(getValues("query")));
                navigate("/product");
              }}
              className="cursor-pointer absolute right-0 top-0 bg-white w-[100px] h-full border-4 border-white rounded-md"
            >
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
