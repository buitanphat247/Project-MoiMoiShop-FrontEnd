import React from "react";
import { Card, Row, Col, Avatar, Divider, Tag, Typography, Button } from "antd";
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  HomeOutlined,
  ManOutlined,
  WomanOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";

const { Text } = Typography;

const UserProfile = () => {
  const user = {
    username: "Antonio Klein",
    email: "antonio.klein@questco.com",
    phone: "+41 707-667-7789",
    age: 35,
    address: "123 Main St, Anytown, USA",
    createdAt: "18 Feb 2023",
    gender: "male",
    role: "UI Designer",
  };

  return (
    <Card
      actions={[<Button icon={<EditOutlined />} type="link" />]}
      className="border-2 border-gray-300"
    >
      <Card.Meta
        avatar={
          <Avatar src="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg" />
        }
        title={user.username}
        description={<Tag color="blue">{user.role}</Tag>}
      />
      <Divider orientation="left">GENERAL</Divider>
      <Row>
        <Col span={24}>
          <Text>
            <IdcardOutlined /> Username: {user.username}
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            <MailOutlined /> Email: {user.email}
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            <PhoneOutlined /> Phone: {user.phone}
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            <CalendarOutlined /> Age: {user.age}
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            <HomeOutlined /> Address: {user.address}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Text>
            <CalendarOutlined /> Date of Joining: {user.createdAt}
          </Text>
        </Col>
        <Col span={24}>
          <Text>
            {user.gender === "male" ? <ManOutlined /> : <WomanOutlined />}{" "}
            Gender: {user.gender}
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;
