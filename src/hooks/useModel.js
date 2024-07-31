import React, { useState } from "react";

const useModel = () => {
  const [model, setModel] = useState({
    isOpenEdit: false,
    dataEdit: {},
  });

  const handleOpenEdit = (data) => {
    setModel({
      isOpenEdit: true,
      dataEdit: data,
    });
  };
  const handleCloseEdit = () => {
    setModel({
      isOpen: false,
      data: {},
    });
  };
  return {
    isOpenEdit: model.isOpenEdit,
    dataEdit: model.dataEdit,
    handleOpenEdit,
    handleCloseEdit,
  };
};

export default useModel;
