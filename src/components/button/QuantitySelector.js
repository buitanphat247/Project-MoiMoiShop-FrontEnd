import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";

const QuantitySelector = ({ initialQuantity = 1, control, setValue }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  // setValue("newQuantity", initialQuantity);
  // Hàm để cập nhật giá trị quantity và thông báo cho react-hook-form
  const updateQuantity = (newQuantity) => {
    setValue("newQuantity", newQuantity);
    setQuantity(newQuantity);
  };

  const increase = () => {
    updateQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) updateQuantity(quantity - 1);
  };
  useEffect(() => {
    setValue("newQuantity", quantity);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={decrease}
        className="border rounded"
        icon={<MinusOutlined />}
        disabled={quantity <= 1}
      />
      <Controller
        control={control}
        name="newQuantity"
        render={({ field }) => (
          <div {...field} className="quantity-display border rounded px-3 py-1">
            {quantity}
          </div>
        )}
      />

      <Button
        onClick={increase}
        className="border rounded"
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export default QuantitySelector;
