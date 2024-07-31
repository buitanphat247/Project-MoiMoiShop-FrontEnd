import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setContentEditor } from "../slices/editorSlice";

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ control }) => {
  const dispatch = useDispatch();
  const { content_editor } = useSelector((state) => state.editor);
  const handleChange = (html) => {
    dispatch(setContentEditor(html));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <ReactQuill
          {...field}
          theme="snow"
          onChange={handleChange}
          value={content_editor}
          modules={modules}
          formats={formats}
          bounds="#root"
        />
      )}
    />
  );
};

export default Editor;
