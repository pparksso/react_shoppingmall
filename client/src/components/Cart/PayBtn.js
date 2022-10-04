import React from "react";
import { Link } from "react-router-dom";

const PayBtn = () => {
  return (
    <div className="payBtnBox">
      <Link to={"/"} className="keepShopping">
        <span>쇼핑 계속하기</span>
      </Link>
      <button className="payment">
        <span>주문하기</span>
      </button>
    </div>
  );
};

export default PayBtn;
