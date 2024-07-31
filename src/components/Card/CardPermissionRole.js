import React from "react";
import { Card, Space, Switch, Typography } from "antd";
import { Controller } from "react-hook-form";
const { Text, Paragraph } = Typography;

const CardPermissionRole = ({ id, name, method, apiPath, control }) => {
  return (
    <label className="flex border-2 px-5 py-2 rounded-md bg-white">
      <Controller
        control={control}
        name={id}
        render={({ field }) => <Switch {...field} />}
      />
      <div for={`permission.${id}`} className="ml-3 ">
        <Text strong>{name}</Text>
        <div>
          <Text type="secondary">{method}</Text>
          <Text type="secondary"> {apiPath}</Text>
        </div>
      </div>
    </label>
  );
};

export default CardPermissionRole;
