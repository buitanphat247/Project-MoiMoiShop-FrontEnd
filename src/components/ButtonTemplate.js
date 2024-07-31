import { Button } from "antd";
import React from "react";

const ButtonTemplate = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-500 mt-1 capitalize"
      style={{
        transition: "background-color 0.3s, color 0.3s",
        height: "40px",
        borderColor: "#e1e1e1",
        color: "white",
        fontWeight: "bold",
        background: "#3b82f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonTemplate;
