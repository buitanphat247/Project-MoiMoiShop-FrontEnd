import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  DataFormFieldProduct,
  DataMethod,
  DataModule,
} from "../../data/ConfigData";
import Editor from "../Editor";
import UploadFIle from "../UploadFIle";
import Field from "../Field/FieldInput";
import Select from "react-select";
const FormProduct = ({ title, data, categories, register, control }) => {
  // const { register, setValue, control, handleSubmit } = useForm();
  const options = [];
  categories.map((item, index) => {
    options.push({
      label: item.name,
      value: item._id,
    });
  });

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="h-full bg-white"
      id="productForm"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
        {title}
      </h2>
      <div>
        <div className="grid grid-cols-2 gap-x-5">
          {DataFormFieldProduct.map((field) => (
            <Field
              register={register}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
            ></Field>
          ))}

          <div className="mb-5">
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select {...field} isMulti options={options} />
              )}
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <UploadFIle control={control}></UploadFIle>
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>{" "}
        <div className="mt-1">
          <Editor control={control}></Editor>
        </div>
      </div>
    </form>
  );
};

export default FormProduct;
