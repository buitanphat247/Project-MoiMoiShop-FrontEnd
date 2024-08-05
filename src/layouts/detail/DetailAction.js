import { Modal } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ModelInstallment from "../../components/ModelInstallment";
import QuantitySelector from "../../components/button/QuantitySelector";
import FormOrder from "../../components/Form/FormOrder";
import CardAdvise from "../../components/Card/CardAdvise";
import { useSelector } from "react-redux";

const DetailAction = ({ data, id }) => {
  const [modal, contextHolder] = Modal.useModal();
  const { register, getValues, setValue, control, reset } = useForm();
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const handleInstallment = async () => {
    const config = {
      title: "Installment Information",
      width: "50%",
      content: (
        <>
          <ModelInstallment
            isLoading={data?.isLoading}
            data={data?.Detail}
          ></ModelInstallment>{" "}
        </>
      ),
    };
    await modal.confirm(config);
  };
  const handleSubmitOrder = async ({
    status_payment,
    message_success,
    message_error,
  }) => {
    const title = status_payment === "CART" ? "Add To Cart" : "Product Payment";
    setValue("username", currentUser.username);
    setValue("email", currentUser.email);
    setValue("address", currentUser.address);
    setValue("phone", currentUser.phone);
    const config = {
      title: title,
      width: "50%",
      content: (
        <>
          <FormOrder
            status_payment
            register={register}
            data={data}
            quantity={getValues("newQuantity")}
          ></FormOrder>
        </>
      ),
      onOk: async () => {
        const DataOrderForm = {
          username: getValues("username"),
          email: getValues("email"),
          phone: getValues("phone"),
          address: getValues("address"),
          description: getValues("description"),
          productId: id,
          quanlity: getValues("newQuantity"),
          status: status_payment,
        };
        const access_token = localStorage.getItem("access_token");
        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const url = `${process.env.REACT_APP_HOST_BACKEND}/orders`;

        try {
          // Make the POST request with axios
          await axios.post(url, DataOrderForm, config);
          toast.success(message_success);
        } catch (error) {
          console.log("error: ", error);
          toast.error(message_error);
        }
      },
    };
    await modal.confirm(config);
  };
  const handleAdvise = async () => {
    const config = {
      title: "Advise",
      width: "50%",
      content: (
        <>
          <CardAdvise register={register}></CardAdvise>
        </>
      ),
    };
    await modal.confirm(config);
  };
  const list_button = [
    {
      name: "Thêm vào giỏ hàng",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      css: "bg-red-500 hover:bg-red-600 flex-1",
      onClick: () => {
        const status_payment = "CART";
        const message_success = "Thêm vào giỏ hàng thành công!";
        const message_error = "Có lỗi xảy ra!";
        handleSubmitOrder({ status_payment, message_success, message_error });
      },
    },
    {
      name: "Mua ngay",
      icon: <i className="fa-regular fa-credit-card"></i>,
      css: "bg-red-500 hover:bg-red-600 flex-1 col-span-2",
      onClick: () => {
        const status_payment = "PENDING APPROVAL";
        const message_success = "Đặt hàng thành công!";
        const message_error = "Có lỗi xảy ra!";
        handleSubmitOrder({ status_payment, message_success, message_error });
      },
    },
    {
      name: "Thông tin trả góp",
      icon: <i className="fa-regular fa-credit-card"></i>,
      css: "bg-blue-500 hover:bg-blue-600",
      onClick: handleInstallment,
    },
    {
      name: "Dịch vụ tư vấn",
      icon: <i className="fa-solid fa-headset"></i>,
      css: "bg-gray-500 hover:bg-gray-600",
      onClick: handleAdvise,
    },
  ];
  return (
    <div className="mt-3 flex flex-col gap-2 ">
      <div className="flex gap-x-2">
        <QuantitySelector
          control={control}
          setValue={setValue}
          initialQuantity={1}
        ></QuantitySelector>
        {list_button.slice(0, 2).map((item, index) => {
          return (
            <button
              onClick={
                isAuthenticated === true
                  ? item.onClick
                  : () => {
                      toast.info("Vui lòng đăng nhập!");
                    }
              }
              className={`rounded-md h-[50px] text-white font-semibold text-lg flex items-center justify-center gap-x-2 ${item.css}`}
              key={index}
            >
              {item.name && <span>{item.name}</span>} <span>{item.icon}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {list_button.slice(2, 5).map((item, index) => {
          return (
            <button
              onClick={item.onClick}
              className={`w-full h-[50px]  rounded-md  text-white font-semibold text-lg flex items-center justify-center gap-x-2 ${item.css}`}
              key={index}
            >
              <span>{item.name}</span>
              <span>{item.icon}</span>
            </button>
          );
        })}
      </div>
      {contextHolder}
    </div>
  );
};

export default DetailAction;
