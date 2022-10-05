import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { approval } from "../../store/slice/kakaopay";

const PayBtn = ({ price, email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = "https://ilbisonte.herokuapp.com/successpay";
  const fail = "https://ilbisonte.herokuapp.com/failpay";
  const cancle = "https://ilbisonte.herokuapp.com/";
  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
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
        dispatch(approval({ tid: res.data.tid, partner_user_id: email }));
        window.location.replace(`${res.data.next_redirect_pc_url}`);
      })
      .catch((err) => {
        navigate("/500");
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
