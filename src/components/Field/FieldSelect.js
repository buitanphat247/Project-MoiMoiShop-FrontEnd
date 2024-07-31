import React from "react";

const FieldSelect = ({ register, name, data }) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        <span className="capitalize">{name}</span>
      </label>
      <select
        {...register(`${name}`, { required: true })}
        className="border border-gray-300 mt-1 p-2 w-full rounded-md focus:ring-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="">{`Please choose ${name}`}</option>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FieldSelect;
