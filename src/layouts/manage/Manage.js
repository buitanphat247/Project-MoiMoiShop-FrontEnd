import React from "react";
import CountUp from "react-countup";
import { Card, Col, Row } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import UserProfile from "../../components/UserProfile";
import { useSelector } from "react-redux";
import CardStatic from "../../components/Card/CardStatic";

const Manage = () => {
  const profile = useSelector((state) => state.auth.currentUser);
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            className="border-2 border-gray-300"
            title="Users"
            bordered={false}
          >
            <CountUp
              start={0}
              end={186745}
              duration={2.75}
              prefix="$"
              suffix=" USD"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="border-2 border-gray-300"
            title="Products"
            bordered={false}
          >
            <CountUp
              start={0}
              end={186745}
              duration={2.75}
              prefix="$"
              suffix=" USD"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="border-2 border-gray-300"
            title="Orders"
            bordered={false}
          >
            <CountUp
              start={0}
              end={186745}
              duration={2.75}
              prefix="$"
              suffix=" USD"
            />
          </Card>
        </Col>
      </Row>
      <div className="mt-5 grid grid-cols-2 gap-x-5">
        <div>
          <UserProfile profile={profile}></UserProfile>
        </div>
        <div>
          <CardStatic></CardStatic>{" "}
        </div>
      </div>
    </div>
  );
};

export default Manage;
