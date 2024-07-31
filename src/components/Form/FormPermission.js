import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataMethod, DataModule } from "../../data/ConfigData";
import Field from "../Field/FieldInput";
import FieldSelect from "../Field/FieldSelect";

const FormPermission = ({ title, register }) => {
  const fields = [
    {
      name: "name",
      placeholder: "Enter your name category...",
      label: "Name",
    },
    {
      name: "apiPath",
      placeholder: "Enter your apiPath...",
      label: "Path",
    },
  ];

  return (
    <form autoComplete="off" className="h-full bg-white" id="permissionForm">
      <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
        {title}
      </h2>
      {fields.map((field) => (
        <Field
          register={register}
          label={field.label}
          name={field.name}
          placeholder={field.placeholder}
        ></Field>
      ))}

      <FieldSelect
        data={DataMethod}
        name={"method"}
        register={register}
      ></FieldSelect>

      <FieldSelect
        data={DataModule}
        name={"module"}
        register={register}
      ></FieldSelect>
    </form>
  );
};

export default FormPermission;
