import React, { useEffect } from "react";

const CanclePay = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  }, []);
  return (
    <div className="pay userPage">
      <div className="loadingBox">
        <div className="loading">
          <h1>결제가 취소되었습니다.</h1>
        </div>
      </div>
    </div>
  );
};

export default CanclePay;
