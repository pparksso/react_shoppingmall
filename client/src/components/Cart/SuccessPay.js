import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ADMIN_KEY } from "../User/KakaoLoginKey";

const SuccessPay = () => {
  const params = new URL(document.location.toString()).searchParams;
  const pg_token = params.get("pg_token");
  const tid = useSelector((state) => {
    return state.kakaopay.tid;
  });
  const partner_user_id = useSelector((state) => {
    return state.kakaopay.partner_user_id;
  });
  useEffect(() => {
    axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/payment/approve",
      headers: {
        Authorization: `KakaoAK ${ADMIN_KEY}`,
      },
      params: {
        cid: "TC0ONETIME",
        tid: tid,
        partner_order_id: "ILBISONTE",
        partner_user_id: partner_user_id,
        pg_token: pg_token,
      },
    }).then((res) => {
      axios({
        method: "POST",
        data: res.data,
        url: "http://localhost:8080/cart/pay",
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.pay) {
            window.location.replace("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  return (
    <div className="pay userPage">
      <div className="loadingBox">
        <div className="loading">
          <h1>결제 진행중 입니다.</h1>
        </div>
      </div>
    </div>
  );
};

export default SuccessPay;
