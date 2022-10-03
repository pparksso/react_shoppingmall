import axios from "axios";
import React from "react";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const CartBtn = ({ no, count }) => {
  const token = cookies.get(["auth"]);
  const cartIn = () => {
    if (token) {
      axios({
        method: "POST",
        url: "http://localhost:8080/cart",
        data: {
          count,
          no,
          token,
        },
      })
        .then((res) => {
          if (res.data.cart) return alert("장바구니에 추가되었습니다.");
          if (!res.data.add) return alert(`${res.data.message}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else return alert("로그인 후 이용이 가능합니다.");
  };
  return (
    <button className="cart" onClick={cartIn}>
      <span>장바구니</span>
    </button>
  );
};

export default CartBtn;
