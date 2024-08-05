import React from "react";
import Field from "../Field/FieldInput";
import { DataFormFieldOrders } from "../../data/ConfigData";
import TextArea from "antd/es/input/TextArea";
import { formatPrice } from "../../pages/Detail";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

const FormOrder = ({ register, data, quantity, status_payment }) => {
  const totalPrice = quantity * data.Detail.price;
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <img
            src={`${process.env.REACT_APP_HOST_BACKEND}/uploads/product/${data.Detail.images[0].name}`}
            alt="Product"
            className="w-full h-40 object-cover rounded"
          />
        </div>
        <div className="flex-1 rounded-lg">
          <h3 className="text-lg font-semibold">{data.Detail.name}</h3>
          <p className="text-gray-700">
            <span className="font-semibold">Giá:</span>{" "}
            <span className="text-red-500">
              {formatPrice(data.Detail.price)} VND
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Số lượng:</span> {quantity}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Tổng tiền:</span>{" "}
            <span className="text-red-500">{formatPrice(totalPrice)} VND</span>
          </p>
        </div>
      </div>
      <form action="" autoComplete="off" className="grid grid-cols-2 gap-x-5">
        {DataFormFieldOrders.map((item, index) => {
          return (
            <Field
              name={item.name}
              defaultValue={currentUser[item.name]}
              label={item.label}
              placeholder={item.placeholder}
              register={register}
            ></Field>
          );
        })}
        <div className="col-span-2">
          <label
            htmlFor={"description"}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="border border-[#d1d5db] rounded-md p-5 min-h-[150px] max-h-[150px] w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your description..."
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default FormOrder;
