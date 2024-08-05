import React from "react";
import ReactHtmlParser from "react-html-parser";

const DetailDsc = ({ description }) => {
  const textContent = ReactHtmlParser(description);
  return (
    <div
      id="textContentDetail"
      className="text-xl leading-relaxed text-justify"
    >
      {textContent}
    </div>
  );
};

export default DetailDsc;
