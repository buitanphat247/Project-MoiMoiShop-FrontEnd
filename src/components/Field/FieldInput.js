import React from "react";

const Field = ({ name, label, placeholder, register, defaultValue = "" }) => {
  return (
    <div className="mb-5" key={name}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { required: true })}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Field;
