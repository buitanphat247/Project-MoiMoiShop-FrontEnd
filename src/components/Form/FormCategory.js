import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../Field/FieldInput";
import { DataFormFieldCategories } from "../../data/ConfigData";

const FormCategory = ({ title, register }) => {
  return (
    <form autoComplete="off" className="h-full bg-white" id="categoryForm">
      <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
        {title}
      </h2>
      {DataFormFieldCategories.map((field) => {
        return (
          <Field
            register={register}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
          ></Field>
        );
      })}
    </form>
  );
};

export default FormCategory;
