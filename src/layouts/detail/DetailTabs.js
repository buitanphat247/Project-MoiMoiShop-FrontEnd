import { notification, Tabs } from "antd";
import React from "react";
import DetailDsc from "./DetailDsc";
import DetailComment from "./DetailComment";
import CardFAQ from "../../components/Card/CardFAQ";

const DetailTabs = ({ data }) => {
  const [api, contextHolder] = notification.useNotification();
  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: <DetailDsc description={data?.description}></DetailDsc>,
    },

    {
      key: "2",
      label: "Đánh giá",
      children: <DetailComment></DetailComment>,
    },
    {
      key: "3",
      label: <span>Câu hỏi thường gặp</span>,
      children: <CardFAQ></CardFAQ>,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs size={"middle"} type="card" defaultActiveKey="1" items={items} />
      {contextHolder}
    </div>
  );
};

export default DetailTabs;
