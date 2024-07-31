import React from "react";
import { Card, Col, Row } from "antd";
import CountUp from "react-countup";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";

const CardStatic = () => {
  return (
    <Card
      className="border-2 border-gray-300 shadow-lg"
      title="Thông Tin Cửa Hàng"
      bordered={false}
      headStyle={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.25rem",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <ShoppingCartOutlined className="text-3xl text-blue-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Số lượng sản phẩm đã bán
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={1500}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <FileTextOutlined className="text-3xl text-green-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Số lượng bài đã đăng
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={200}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <ClockCircleOutlined className="text-3xl text-yellow-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Số lượng bài chờ duyệt
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={50}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <CheckCircleOutlined className="text-3xl text-purple-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Số lượng bài đã duyệt
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={180}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <CloseCircleOutlined className="text-3xl text-red-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Số lượng bài từ chối
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={20}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <DollarCircleOutlined className="text-3xl text-teal-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Doanh thu
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={50000}
                duration={2.75}
                prefix="$"
                suffix=" USD"
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <UserAddOutlined className="text-3xl text-blue-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Người dùng mới
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={300}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <FileDoneOutlined className="text-3xl text-green-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Đơn hàng đã giao
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={1200}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <ShoppingOutlined className="text-3xl text-yellow-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Tổng số lượng sản phẩm
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={10000}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <ExclamationCircleOutlined className="text-3xl text-red-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Sản phẩm bị lỗi
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={15}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <EyeOutlined className="text-3xl text-purple-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Lượt truy cập
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={50000}
                duration={2.75}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <PercentageOutlined className="text-3xl text-teal-500 mr-2" />
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Tỷ lệ hoàn thành đơn hàng
              </div>
              <CountUp
                className="text-xl font-bold"
                start={0}
                end={95}
                duration={2.75}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CardStatic;
