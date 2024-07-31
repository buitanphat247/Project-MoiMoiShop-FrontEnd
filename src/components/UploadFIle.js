import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import axios from "axios";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setImage, setNewListImage } from "../slices/fileSlice";

const UploadFile = ({ control }) => {
  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.file);

  const handleRequest = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    const formData = new FormData();
    formData.append("file_content", file);
    try {
      const url = `${process.env.REACT_APP_HOST_BACKEND}/files`;
      const response = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          folder_type: "product",
        },
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round((loaded / total) * 100) });
        },
      });

      message.success("Upload thành công!");
      dispatch(setImage(response.data.data));

      onSuccess("OK");
    } catch (error) {
      console.log("error: ", error);
      message.error("Lỗi upload, vui lòng thử lại!");
      onError("Error uploading file");
    }
  };

  const handleRemove = async (file) => {
    try {
      // const url = `${process.env.REACT_APP_HOST_BACKEND}/files?name=${file.name}&folder_type=product`;

      // const url_update_image = `${process.env.REACT_APP_HOST_BACKEND}/files/images`;
      // await axios.put()

      const access_token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };
      const newFileList = image.filter((f) => f.name !== file.name);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_BACKEND}/products/image/${file.name}`,
          config
        );
        const { _id } = response.data.data[0];
        await axios.put(
          `${process.env.REACT_APP_HOST_BACKEND}/products/image/${_id}`,
          { images: newFileList },
          config
        );
      } catch (error) {
      } finally {
        await axios.delete(
          `${process.env.REACT_APP_HOST_BACKEND}/files?name=${file.name}&folder_type=product`,
          config
        );
        dispatch(setNewListImage(newFileList));
        message.success("Xóa thành công!");
      }
    } catch (error) {
      console.log(error);
      message.warning("Xoá thất bại!");
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className="mt-1">
      <Controller
        name="image"
        control={control}
        render={({ field }) => {
          return (
            <Upload
              {...field}
              listType="picture-card"
              customRequest={handleRequest}
              fileList={image}
              onRemove={handleRemove}
            >
              {image.length >= 10 ? null : uploadButton}
            </Upload>
          );
        }}
      />
    </div>
  );
};

export default UploadFile;
