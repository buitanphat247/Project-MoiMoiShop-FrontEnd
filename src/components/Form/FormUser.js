import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../Field/FieldInput";
import FieldSelect from "../Field/FieldSelect";
import { DataFormFieldUser } from "../../data/ConfigData";

const FormUser = ({ title, type_field, register }) => {
  return (
    <form autoComplete="off" className="h-full bg-white" id="updateForm">
      <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
        {title}
      </h2>
      {DataFormFieldUser.map((field) => {
        if (type_field === "create")
          return (
            <Field
              register={register}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
            ></Field>
          );
        else {
          if (field.name !== "password")
            return (
              <Field
                register={register}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
              ></Field>
            );
        }
      })}

      <FieldSelect
        name={"gender"}
        register={register}
        data={["male", "female"]}
      ></FieldSelect>
    </form>
  );
};

export default FormUser;
