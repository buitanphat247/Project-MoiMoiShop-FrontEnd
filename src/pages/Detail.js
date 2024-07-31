// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import _ from "lodash";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Flex, Modal, notification, Space, Spin, Tabs, Tag } from "antd";
import FormComment from "../components/Form/FormComment";
import CardListProduct from "../components/Card/CardListProduct";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import ModelInstallment from "../components/ModelInstallment";
import FormOrder from "../components/Form/FormOrder";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import CardAdvise from "../components/Card/CardAdvise";
import CardFAQ from "../components/Card/CardFAQ";
import QuantitySelector from "../components/button/QuantitySelector";
const { parseDOM } = require("htmlparser2");
export const formatPrice = (price) => {
  if (!price) return ""; // Kiểm tra nếu không có giá trị

  // Sử dụng Number.prototype.toFixed để làm tròn và định dạng giá trị
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const Detail = () => {
  let { id } = useParams();
  const { control, register, setValue, getValues } = useForm();
  const [data, setData] = useState({
    Detail: {},
    ProductPhone: [],
    ProductLaptop: [],
    isLoading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      setData({ ...data, isLoading: true });
      const access_token = localStorage.getItem("access_token");
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
        withCredentials: true,
      };

      const urls = [
        `${process.env.REACT_APP_HOST_BACKEND}/products/${id}`,
        `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2e99961853fec8c7b3dd`,
        `${process.env.REACT_APP_HOST_BACKEND}/products?current=1&limit=10&categories=669c2ea9961853fec8c7b3df`,
      ];

      try {
        const [responseDetail, responsePhone, responseLaptop] =
          await Promise.all(urls.map((url) => axios.get(url, config)));
        setData({
          Detail: responseDetail.data.data,
          ProductPhone: responsePhone.data.data.result,
          ProductLaptop: responseLaptop.data.data.result,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mt-5 bg-white p-5 rounded-md">
      {!data.isLoading ? (
        <>
          <div className="flex overflow-hidden gap-x-5">
            <div className="w-full flex gap-x-5">
              <DetailPicture images={data?.Detail?.images}></DetailPicture>

              <div className="flex-1">
                <h1 className="text-xl font-bold capitalize text-gray-800">
                  {data?.Detail?.name}
                </h1>
                <h1 className="text-2xl mt-2 font-bold text-[#fb5531] flex items-center">
                  <Space>
                    <span>{formatPrice(data?.Detail?.price)}</span>
                    <span>VND</span>
                  </Space>
                </h1>

                <DetailButton data={data}></DetailButton>

                <DetailCategory data={data?.Detail}></DetailCategory>
              </div>

              <DetailBox></DetailBox>
            </div>
          </div>
          <DetailDesciprtion data={data?.Detail}></DetailDesciprtion>
        </>
      ) : (
        <div className="col-span-5 flex items-center justify-center h-[80vh]">
          <Spin tip="Loading" size="large"></Spin>
        </div>
      )}
      <CardListProduct
        data={data.ProductLaptop}
        isLoading={data.isLoading}
        title_menu_product="máy tính"
      ></CardListProduct>
      <CardListProduct
        data={data.ProductPhone}
        isLoading={data.isLoading}
        title_menu_product="điện thoại"
      ></CardListProduct>
    </div>
  );
};

export default Detail;

const DetailDesciprtion = ({ data }) => {
  const [api, contextHolder] = notification.useNotification();
  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: (
        <DescriptionProduct
          description={data?.description}
        ></DescriptionProduct>
      ),
    },

    {
      key: "2",
      label: "Đánh giá",
      children: <CommentDetail></CommentDetail>,
    },
    {
      key: "3",
      label: <span>Câu hỏi thường gặp</span>,
      children: <CardFAQ></CardFAQ>,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs size={"middle"} type="card" defaultActiveKey="1" items={items} />
      {contextHolder}
    </div>
  );
};

const DetailButton = ({ data }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const { register, getValues, setValue, reset, control } = useForm();
  const [openAdvance, setOpenAdvane] = useState(false);
  const handleInstallment = async () => {
    const config = {
      title: "Thông tin trả góp",
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
  const showModal = () => {
    setOpen(true);
  };

  const list_button = [
    {
      name: "Thêm vào giỏ hàng",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      css: "bg-red-500 hover:bg-red-600 flex-1",
      onClick: () => {},
    },
    {
      name: "Mua ngay",
      icon: <i className="fa-regular fa-credit-card"></i>,
      css: "bg-red-500 hover:bg-red-600 flex-1 col-span-2",
      onClick: showModal,
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
      onClick: () => {
        setOpenAdvane(true);
      },
    },
  ];
  const navigate = useNavigate();
  const handleSubmitOrder = async ({ id }) => {
    const DataOrderForm = {
      username: getValues("username"),
      email: getValues("email"),
      phone: getValues("phone"),
      address: getValues("address"),
      description: getValues("description"),
      productId: id,
      quanlity: getValues("newQuantity"),
      status: "CART",
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
      toast.success("Đặt hàng thành công!");
      Object.keys(DataOrderForm).forEach((key) => {
        setValue(key, "");
      });
      setValue("newQuantity", 1);
      setOpen(false);
      navigate("/order");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Đặt hàng thất bại!");
      setOpen(false);
    }
  };
  return (
    <div className="mt-3 flex flex-col gap-2 ">
      <div className="flex gap-x-2">
        <QuantitySelector
          control={control}
          setValue={setValue}
          initialQuantity={1}
        ></QuantitySelector>
        {list_button.slice(0, 1).map((item, index) => {
          return (
            <button
              onClick={item.onClick}
              className={`rounded-md h-[50px] text-white font-semibold text-lg flex items-center justify-center gap-x-2 ${item.css}`}
              key={index}
            >
              {item.name && <span>{item.name}</span>} <span>{item.icon}</span>
            </button>
          );
        })}
        <Modal
          width="40%"
          open={open}
          onOk={() => {
            handleSubmitOrder({ id: data.Detail._id });
          }}
          onCancel={() => setOpen(false)}
        >
          <FormOrder register={register}></FormOrder>
        </Modal>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {list_button.slice(1, 5).map((item, index) => {
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
        <Modal
          width="30%"
          open={openAdvance}
          onOk={() => setOpenAdvane(false)}
          onCancel={() => setOpenAdvane(false)}
        >
          <CardAdvise register={register}></CardAdvise>
        </Modal>
      </div>
      {contextHolder}{" "}
    </div>
  );
};

const DetailCategory = ({ data }) => {
  return (
    <div>
      <div className="mt-5">
        <ul>
          <li className="border-t-2 border-dotted  py-2">
            <span>Mã: </span>
            <span>{data?._id}</span>
          </li>
          <li className="border-t-2 border-dotted  py-2">
            <span>Danh mục: </span>
            <span>AI - Trí tuệ nhân tạo</span>
          </li>
          <li className="border-t-2 border-dotted  py-2">
            <span>Từ khóa: </span>
            <span>{data?.categories.name}</span>
          </li>
          <li className="border-t-2 border-dotted  py-2">
            <span>Số lượng: </span>
            <span>{data?.quanlity}</span>
          </li>
        </ul>
      </div>
      <div className="border-t-2 py-2">
        <p className=" text-gray-700 mb-2">Chia sẻ:</p>
        <Flex gap="4px 0" wrap>
          <Tag className="tag-icon" icon={<TwitterOutlined />} color="#55acee">
            Twitter
          </Tag>
          <Tag className="tag-icon" icon={<YoutubeOutlined />} color="#cd201f">
            Youtube
          </Tag>
          <Tag className="tag-icon" icon={<FacebookOutlined />} color="#3b5999">
            Facebook
          </Tag>
          <Tag className="tag-icon" icon={<LinkedinOutlined />} color="#55acee">
            LinkedIn
          </Tag>
        </Flex>
      </div>
    </div>
  );
};

const DetailPicture = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-[40%]">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images &&
          images.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="h-[350px] flex items-center rounded-md overflow-hidden group">
                  <img
                    className="w-full h-full object-fill  cursor-pointer transition-all"
                    src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${item.name}`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        {images &&
          images.map((item, index) => {
            return (
              <SwiperSlide key={index} className="rounded-md overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${item.name}`}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

const DetailBox = () => {
  return (
    <div>
      <ul className="border-2 border-[#fb5531] rounded-md">
        <li className="flex flex-col px-10 py-3 border-b-2">
          <span className="text-lg font-bold">Giao hàng miễn phí</span>
          <span>Với đơn hàng trên 100.000đ</span>
        </li>
        <li className="flex flex-col px-10 py-3 border-b-2">
          <span className="text-lg font-bold">Đổi trả nhanh chóng</span>
          <span>Đổi trả trong vòng 14 ngày</span>
        </li>
        <li className="flex flex-col px-10 py-3 border-b-2">
          <span className="text-lg font-bold">Hình thức thanh toán</span>
          <span>Thanh toán khi nhận hàng</span>
        </li>
        <li className="flex flex-col px-10 py-3">
          <span className="text-lg font-bold">Đặt hàng online</span>
          <span>Gọi ngay 0905 692 314</span>
        </li>
      </ul>
    </div>
  );
};

const DescriptionProduct = ({ description }) => {
  const textContent = ReactHtmlParser(description);
  return (
    <div
      id="textContentDetail"
      className="text-xl leading-relaxed text-justify"
    >
      {textContent}
    </div>
  );
};

const CommentDetail = () => {
  return <FormComment></FormComment>;
};
