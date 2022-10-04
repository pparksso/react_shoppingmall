import React from "react";

const PayBox = ({ price }) => {
  return (
    <div className="payBox">
      <span className="title">구매금액 : </span>
      <span className="price">{price.toLocaleString()} </span>
      <span className="won">원</span>
    </div>
  );
};

export default PayBox;
