import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Collapse, Checkbox, Space, Typography, Card } from "antd";
import axios from "axios";
import { DataModule } from "../../data/ConfigData";
import Field from "../Field/FieldInput";
import CardPermissionRole from "../Card/CardPermissionRole";

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

const FormRole = ({ permissions, register, control }) => {
  const fields = [
    {
      name: "name",
      placeholder: "Enter your name category...",
      label: "Name",
    },
  ];
  return (
    <div>
      <form id="roleForm">
        {fields.map((field) => (
          <Field
            register={register}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
          ></Field>
        ))}

        <Collapse
          bordered={false}
          activeKey={["1"]}
          expandIconPosition="disabled"
        >
          {DataModule.map((module, moduleIndex) => (
            <Panel header={module} key={1}>
              <div className="flex flex-wrap gap-5">
                {permissions.map((permission) => {
                  if (permission.module === module) {
                    return (
                      <CardPermissionRole
                        control={control}
                        apiPath={permission.apiPath}
                        method={permission.method}
                        id={permission._id}
                        name={permission.name}
                        register={register}
                      ></CardPermissionRole>
                    );
                  }
                  return null;
                })}
              </div>
            </Panel>
          ))}
        </Collapse>
      </form>
    </div>
  );
};

export default FormRole;
