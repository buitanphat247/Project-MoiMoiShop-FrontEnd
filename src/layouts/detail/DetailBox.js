import React from "react";

const DetailBox = () => {
  return (
    <div className="flex-1">
      <ul className="bg-white p-6 rounded-lg shadow-lg space-y-5 border-2 border-[#fb5531]">
        <li className="flex items-center">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            🚚
          </span>
          <span>Giao hàng miễn phí với đơn hàng trên 100.000đ</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            🔄
          </span>
          <span>Đổi trả nhanh chóng trong vòng 14 ngày</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            💳
          </span>
          <span>Thanh toán khi nhận hàng</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            ☎️
          </span>
          <span>Đặt hàng online: 0905 692 314</span>
        </li>
      </ul>
    </div>
  );
};

export default DetailBox;
