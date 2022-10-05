import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../scss/detail.scss";
import CartBtn from "../Items/CartBtn";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const no = parseInt(params.no);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState([]);
  const [price, setPrice] = useState();
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios({
      url: `http://localhost:8080/item?no=${no}`,
    })
      .then((res) => {
        const korPrice = res.data.result.price.toLocaleString();
        setDesc(res.data.result.desc);
        setImg([res.data.result.image[0], res.data.result.image[1]]);
        setPrice(korPrice);
        setSize(res.data.result.size);
        setTitle(res.data.result.title);
      })
      .catch((err) => {
        navigate("/500");
      });
  }, [no]);
  const subtractCount = () => {
    if (count === 1) return false;
    else return setCount(count - 1);
  };
  const plusCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="detail">
      <div className="container">
        <div className="imgBox">
          {img.map((item, idx) => (
            <img src={item} alt={title} key={idx} />
          ))}
        </div>
        <div className="txtBox">
          <div className="titleBox">
            <div className="title">
              <h1>{title}</h1>
            </div>
            <div className="price">
              <p>{price}</p>
            </div>
          </div>
          <div className="countBox">
            <button onClick={subtractCount}>
              <span className="material-icons">remove</span>
            </button>
            <span>{count}</span>
            <button onClick={plusCount}>
              <span className="material-icons">add</span>
            </button>
          </div>
          <div className="btns">
            <CartBtn no={no} count={count} />
          </div>
          <div className="descBox">
            <p className="title">상품설명</p>
            <p className="desc">{desc}</p>
          </div>
          <div className="sizeBox">
            <p className="title">상품사이즈</p>
            <span>가로x세로x폭 - </span>
            <span>{size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
