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
      <h2 className="text-2xl font-semibold mb-3 text-center uppercase">
        Thông Tin Liên Hệ TƯ Vấn
      </h2>{" "}
      <form action="">
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
        <div className="mb-5">
          <label
            htmlFor={"description"}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="border rounded-md p-5 min-h-[150px] max-h-[150px] w-full mt-1"
            placeholder="Enter your description"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CardAdvise;
