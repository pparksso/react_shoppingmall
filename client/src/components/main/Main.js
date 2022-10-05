import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import Weekly from "../Items/Weekly";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const Movepage = useSelector((state) => {
    return state.page.value.num;
  });
  const [best, setBest] = useState([]);
  const [all, setAll] = useState([]);
  const [count, setCount] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [startPage, setStartPage] = useState("");
  const [lastPage, setLastPage] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/item/best",
    })
      .then((res) => {
        setBest(res.data.items);
      })
      .catch((err) => {
        navigate("/500");
      });
  }, []);
  useEffect(() => {
    setPage(Movepage);
  }, [Movepage]);
  useEffect(() => {
    axios({
      url: `http://localhost:8080/item/category/${category}?page=${page}`,
    })
      .then((res) => {
        setAll(res.data.currentItems);
        setCount(res.data.totalItems);
        setTotalPage(res.data.totalPage);
        setStartPage(res.data.startPage);
        setLastPage(res.data.lastPage);
      })
      .catch((err) => {
        navigate("/500");
      });
  }, [page]);
  return (
    <div className="main">
      <div className="weekly">
        <div className="container">
          <div className="weeklyBox">
            <div className="titleBox">
              <h1>weekly best</h1>
            </div>
            <div className="weeklyItems items">
              <ul className="itemList">
                {best.map((item, idx) => {
                  return <Weekly key={idx} itemInfo={item} idx={idx} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Product count={count} totalPage={totalPage} startPage={startPage} lastPage={lastPage} page={page} item={all} category={category}></Product>
    </div>
  );
};

export default Main;
