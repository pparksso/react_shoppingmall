import React, { useEffect } from "react";

const FailPay = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace("/cart");
    }, 1000);
  }, []);
  return (
    <div className="pay userPage">
      <div className="loadingBox">
        <div className="loading">
          <h1>결제에 실패하였습니다.</h1>
        </div>
      </div>
    </div>
  );
};

export default FailPay;
