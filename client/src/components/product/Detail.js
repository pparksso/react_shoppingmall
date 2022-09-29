import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../scss/detail.scss";

const Detail = () => {
  const params = useParams();
  const no = parseInt(params.no);
  const [desc, setDesc] = useState("");
  const [img01, setImg01] = useState("");
  const [img02, setImg02] = useState("");
  const [price, setPrice] = useState();
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    axios({
      url: `http://localhost:8080/item?no=${no}`,
    })
      .then((res) => {
        const korPrice = res.data.result.price.toLocaleString();
        setDesc(res.data.result.desc);
        setImg01(res.data.result.image[0]);
        setImg02(res.data.result.image[1]);
        setPrice(korPrice);
        setSize(res.data.result.size);
        setTitle(res.data.result.title);
      })
      .catch((err) => {
        console.log("500보내야함");
      });
  }, [no]);
  return (
    <div className="detail">
      <div className="container">
        <div className="imgBox">
          <img src={img01} alt={title} />
          <img src={img02} alt={title} />
        </div>
        <div className="detailBox">
          <div className="titleBox">
            <div className="title">
              <h1>{title}</h1>
            </div>
            <div className="price">
              <p>
                {price} <span>원</span>
              </p>
            </div>
          </div>
          <div className="btns">
            <button>
              <span>장바구니</span>
            </button>
            <button>
              <span>바로결제</span>
            </button>
          </div>
          <div className="descBox">
            <p>상품설명</p>
            <p>{desc}</p>
          </div>
          <div className="sizeBox">
            <p>상품사이즈</p>
            <span>가로x세로x폭 - </span>
            <span>{size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
