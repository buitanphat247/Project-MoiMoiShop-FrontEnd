// CardProfile.js
import React from "react";
import { Table, Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CardProfile = ({ user }) => {
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (text) => (
        <span className="font-semibold text-gray-700">{text}</span>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text) => <span className="text-gray-900">{text}</span>,
    },
  ];

  const data = [
    { key: "1", field: "ID", value: user._id },
    { key: "2", field: "Username", value: user.username },
    { key: "3", field: "Email", value: user.email },
    { key: "4", field: "Phone", value: user.phone },
    { key: "5", field: "Age", value: user.age },
    { key: "6", field: "Role", value: user.role.name },
    { key: "7", field: "Address", value: user.address },
    { key: "8", field: "Gender", value: user.gender },
  ];

  return (
    <div>
      <Flex align="center" justify="center" className="mb-3">
        <Avatar size={120} icon={<UserOutlined />} />
      </Flex>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
        bordered
      />
    </div>
  );
};

export default CardProfile;
