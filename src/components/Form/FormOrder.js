import React from "react";
import Field from "../Field/FieldInput";
import { DataFormFieldOrders } from "../../data/ConfigData";
import TextArea from "antd/es/input/TextArea";

const FormOrder = ({ register }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3 text-center uppercase">
        Đặt Hàng
      </h2>{" "}
      <form action="" autoComplete="off" className="grid grid-cols-2 gap-5">
        {DataFormFieldOrders.map((item, index) => {
          return (
            <Field
              name={item.name}
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
            className="border rounded-md p-5 min-h-[250px] max-h-[250px] w-full mt-1"
            placeholder="Enter your description"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default FormOrder;
