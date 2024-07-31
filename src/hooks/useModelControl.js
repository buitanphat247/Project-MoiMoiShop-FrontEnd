import React, { useState } from "react";

const useModelControl = () => {
  const [model, setModel] = useState({
    isOpenEdit: false,
    isOpenCreate: false,
    dataEdit: null,
  });

  const handleOpenEdit = (data) => {
    setModel({
      ...model,
      isOpenEdit: true,
      dataEdit: data,
    });
  };
  const handleOpenCreate = () => {
    setModel({
      ...model,
      isOpenCreate: true,
    });
  };
  const handleCloseCreate = () => {
    setModel({
      ...model,
      isOpenCreate: false,
    });
  };
  const handleCloseEdit = () => {
    setModel({
      ...model,
      isOpenEdit: false,
      dataEdit: null,
    });
  };
  const handleCloseAll = () => {
    setModel({
      ...model,
      isOpenCreate: false,
      isOpenEdit: false,
    });
  };
  return {
    isOpenEdit: model.isOpenEdit,
    dataEdit: model.dataEdit,
    isOpenCreate: model.isOpenCreate,
    handleOpenCreate,
    handleCloseCreate,
    handleOpenEdit,
    handleCloseEdit,
    handleCloseAll,
  };
};

export default useModelControl;
