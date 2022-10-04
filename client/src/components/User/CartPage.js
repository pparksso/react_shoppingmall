import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import RemoveCart from "./RemoveCart";

const cookies = new Cookies();

const CartPage = () => {
  const [noCart, setNocart] = useState(false);
  const [del, setDel] = useState(false);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const token = cookies.get(["auth"]);
  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:8080/cart/cartview`,
      withCredentials: true,
      data: {
        token,
      },
    })
      .then((res) => {
        setDel(false);
        if (!res.data.cart) {
          setItems([]);
          setNocart(true);
        } else {
          setItems(res.data.cart[0]);
          setQuantity(res.data.quantity);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [del]);
  const deleteItem = (no) => {
    axios({
      method: "POST",
      url: `http://localhost:8080/cart/del`,
      withCredentials: true,
      data: {
        no,
        token,
      },
    })
      .then((res) => {
        if (res.data.delete) setDel(true);
        else return alert("장바구니에서 상품을 제거하지 못했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="cart userPage">
      <div className="container">
        <div className="titleBox">
          <h1>장바구니</h1>
        </div>
        <div className="cartList">
          <ul className="tableTitle">
            <li className="idx">
              <span>No.</span>
            </li>
            <li>
              <span>상품정보</span>
            </li>
            <li>
              <span>수량</span>
            </li>
            <li>
              <span>판매가</span>
            </li>
            <li>
              <span>삭제</span>
            </li>
          </ul>
          {items.map((item, idx) => {
            return (
              <ul className="tableTitle" key={idx}>
                <li className="idx">
                  <span>{idx + 1}</span>
                </li>
                <li>
                  <div className="itemDesc">
                    <Link to={`/detail/${item.no}`}>
                      <img src={item.image[0]} alt={item.title} />
                    </Link>
                    <Link to={`/detail/${item.no}`}>
                      <span>{item.title}</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <span>
                    {quantity.map((item02) => {
                      return item02.no === item.no ? item02.quantity : null;
                    })}
                  </span>
                </li>
                <li>
                  <span>{item.price.toLocaleString()}</span>
                </li>
                {/* <RemoveCart no={item.no} token={token} /> */}
                <li>
                  <button onClick={() => deleteItem(item.no)}>
                    <span>삭제</span>
                  </button>
                </li>
              </ul>
            );
          })}
          {noCart && (
            <div className="noCart">
              <p>장바구니에 등록된 상품이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
