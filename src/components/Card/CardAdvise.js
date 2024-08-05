import React from "react";
import Field from "../Field/FieldInput";

const CardAdvise = ({ register }) => {
  const itemsAdvise = [
    {
      name: "username",
      placeholder: "Enter your username...",
      label: "Username",
      defaultValue: "",
    },
    {
      name: "email",
      placeholder: "Enter your email...",
      label: "Email",
      defaultValue: "",
    },
    {
      name: "phone",
      placeholder: "Enter your phone...",
      label: "Phone",
      defaultValue: "",
    },
  ];
  return (
    <div>
      <form autoComplete="off">
        <div className="grid grid-cols-2 gap-x-5">
          <div>
            {itemsAdvise.map((item, index) => {
              return (
                <Field
                  key={index}
                  label={item.label}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  placeholder={item.placeholder}
                  register={register}
                ></Field>
              );
            })}
          </div>
          <div className="mb-5">
            <label
              htmlFor={"description"}
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              className="border border-[#d1d5db] rounded-md p-5 min-h-[200px] max-h-[200px] w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your description"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardAdvise;
