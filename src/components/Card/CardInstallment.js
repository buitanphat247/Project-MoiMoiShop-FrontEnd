import React from "react";
import { formatPrice } from "../../pages/Detail";
import { Flex, Space } from "antd";

const CardInstallment = ({ price, percentage, months }) => {
  const calculateInstallment = (price, upfrontPercentage, months) => {
    // Số tiền trả trước
    const upfrontAmount = (price * upfrontPercentage) / 100;

    // Số tiền còn lại sau khi trả trước
    const remainingAmount = price - upfrontAmount;

    // Góp mỗi tháng
    const monthlyInstallment = remainingAmount / months;
    console.log("monthlyInstallment: ", monthlyInstallment);

    // Tổng số tiền phải trả sau khi trả góp
    const totalInstallmentAmount = upfrontAmount + monthlyInstallment * months;

    // Chênh lệch
    const difference = totalInstallmentAmount - price;

    return {
      upfrontAmount: upfrontAmount.toFixed(0),
      monthlyInstallment: monthlyInstallment.toFixed(0),
      difference: difference.toFixed(0),
      totalInstallmentAmount: totalInstallmentAmount.toFixed(0),
    };
  };

  const {
    upfrontAmount,
    monthlyInstallment,
    difference,
    totalInstallmentAmount,
  } = calculateInstallment(price, percentage, months);

  return (
    <div className="bg-white border-2 rounded-lg w-80">
      <div className="bg-red-500 text-white p-4 rounded-t-lg">
        <h3 className="text-lg font-bold">HOME CREDIT</h3>
        <p>Kỳ hạn {months} tháng</p>
        <p>Không phí: Bảo hiểm, hồ sơ</p>
      </div>
      <div className="p-4 text-gray-700">
        <ul className="space-y-2">
          <li>
            Gói trả góp: <span className="font-bold">0%</span>
          </li>
          <li>
            Trả trước:{" "}
            <span className="font-bold">
              {percentage}% ({formatPrice(upfrontAmount)}₫)
            </span>
          </li>
          <li>
            Góp mỗi tháng:{" "}
            <span className="font-bold">
              {formatPrice(monthlyInstallment)}₫
            </span>
          </li>

          <li>
            Giấy tờ: <span className="font-bold">CMND/CCCD</span>
          </li>
          <li>
            Tổng tiền sau trả góp:{" "}
            <span className="font-bold">
              {formatPrice(totalInstallmentAmount)}₫
            </span>
          </li>
        </ul>
        <button className="bg-orange-500 text-white w-full py-2 mt-4 rounded hover:bg-orange-600">
          Đặt mua
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          Duyệt qua điện thoại giao hàng tại nhà
        </p>
      </div>
    </div>
  );
};

export default CardInstallment;
