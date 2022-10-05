import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ADMIN_KEY } from "../User/KakaoLoginKey";
import { useDispatch } from "react-redux";
import { approval } from "../../store/slice/kakaopay";

const PayBtn = ({ price, email }) => {
  const dispatch = useDispatch();
  const success = "http://localhost:3000/successpay";
  const fail = "http://localhost:3000/failpay";
  const cancle = "http://localhost:3000/";
  const kakaoPayBtn = () => {
    axios({
      method: "POST",
      url: `https://kapi.kakao.com/v1/payment/ready`,
      headers: {
        Authorization: `KakaoAK ${ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "ILBISONTE",
        partner_user_id: `${email}`,
        item_name: "ILBISONTE",
        quantity: 1,
        total_amount: `${price}`,
        tax_free_amount: 0,
        approval_url: `${success}`,
        cancel_url: `${cancle}`,
        fail_url: `${fail}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(approval({ tid: res.data.tid, partner_user_id: email }));
        window.location.replace(`${res.data.next_redirect_pc_url}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="payBtnBox">
      <Link to={"/"} className="keepShopping">
        <span>쇼핑 계속하기</span>
      </Link>
      <button className="payment" onClick={kakaoPayBtn}>
        <span>주문하기</span>
      </button>
    </div>
  );
};

export default PayBtn;
