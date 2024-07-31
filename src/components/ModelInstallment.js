import { Space } from "antd";
import React from "react";
import { formatPrice } from "../pages/Detail";
import CardInstallment from "./Card/CardInstallment";

const ModelInstallment = ({ data }) => {
  const { images, name, price } = data;
  return (
    <>
      <div className="flex items-start gap-x-5">
        <div className="w-[35%] rounded-md overflow-hidden">
          <img
            className="w-full h-full object-fill"
            src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${images?.[0].name}`}
            alt="Product Image"
            classaName="w-24 h-24 object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-end gap-x-3">
            <h1 className="text-xl font-semibold">{name}</h1>
            <p classaName="text-red-500 font-bold text-xl">
              <Space>
                <span className="font-bold text-xl">{formatPrice(price)}</span>
                <span className="font-bold text-xl">VND</span>
              </Space>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Khuyến mãi:</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Nhập mã VNPAYTGDD3 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá
                trị đơn hàng) khi thanh toán qua VNPAY-QR{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Xem chi tiết tại đây
                </span>
              </li>
            </ul>
            <h2 className="text-lg font-semibold">
              Chính sách Online giá rẻ quá:
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Giao hàng nhanh chóng (tùy khu vực)</li>
              <li>Mỗi số điện thoại chỉ mua 3 sản phẩm trong 1 tháng</li>
              <li>Giá và khuyến mãi có thể kết thúc sớm</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-x-5 items-center justify-center mt-5">
        <CardInstallment
          price={data.price}
          percentage={30}
          months={6}
        ></CardInstallment>
        <CardInstallment
          price={data.price}
          percentage={30}
          months={9}
        ></CardInstallment>
        <CardInstallment
          price={data.price}
          percentage={30}
          months={12}
        ></CardInstallment>
      </div>
      <div class="mt-6 text-gray-500 border-t-2 pt-3">
        <p>Lưu ý: Số tiền thực tế có thể chênh lệch đến 10.000đ/tháng</p>
        <p class="text-blue-500 underline cursor-pointer">
          Những điều cần biết khi mua trả góp
        </p>
      </div>
    </>
  );
};

export default ModelInstallment;
