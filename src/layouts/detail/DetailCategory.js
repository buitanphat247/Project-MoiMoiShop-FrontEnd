import React from "react";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Flex, Modal, notification, Space, Spin, Tabs, Tag } from "antd";

const DetailCategory = ({ data }) => {
  return (
    <div>
      <div className="mt-5">
        <ul>
          <li className="border-t-2 border-dotted  py-2">
            <span>Mã: </span>
            <span>{data?._id}</span>
          </li>
          <li className="border-t-2 border-dotted  py-2">
            <span>Danh mục: </span>
            <span>AI - Trí tuệ nhân tạo</span>
          </li>
          <li className="border-t-2 border-dotted  py-2">
            <span>Từ khóa: </span>
            <span>{data?.category.name}</span>
          </li>
          {/* <li className="border-t-2 border-dotted  py-2">
            <span>Số lượng: </span>
            <span>{data?.quanlity}</span>
          </li> */}
        </ul>
      </div>
      <div className="border-t-2 py-2">
        <p className=" text-gray-700 mb-2">Chia sẻ:</p>
        <Flex gap="4px 0" wrap>
          <Tag className="tag-icon" icon={<TwitterOutlined />} color="#55acee">
            Twitter
          </Tag>
          <Tag className="tag-icon" icon={<YoutubeOutlined />} color="#cd201f">
            Youtube
          </Tag>
          <Tag className="tag-icon" icon={<FacebookOutlined />} color="#3b5999">
            Facebook
          </Tag>
          <Tag className="tag-icon" icon={<LinkedinOutlined />} color="#55acee">
            LinkedIn
          </Tag>
        </Flex>
      </div>
    </div>
  );
};
export default DetailCategory;
