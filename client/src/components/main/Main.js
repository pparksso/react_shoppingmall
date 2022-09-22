import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import Weekly from "../items/Weekly";
import Item from "../items/Item";
import Pagenation from "../main/Pagination";

const Main = () => {
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
    }).then((res) => {
      setBest(res.data.items);
    });
  }, []);
  useEffect(() => {
    axios({
      url: `http://localhost:8080/item/category/${category}?page=${page}`,
    }).then((res) => {
      setAll(res.data.currentItems);
      setCount(res.data.totalItems);
      setTotalPage(res.data.totalPage);
      setStartPage(res.data.startPage);
      setLastPage(res.data.lastPage);
    });
  }, []);
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
      <div className="itemList">
        <div className="titleBox">
          <span className="category">ALL</span>
          <span className="number">({count})</span>
        </div>
        <div className="container">
          <div className="categoryItems items">
            <ul className="itemList">
              {all.map((item, idx) => {
                return <Item key={idx} itemInfo={item} />;
              })}
            </ul>
          </div>
          <Pagenation totalPage={totalPage} startPage={startPage} lastPage={lastPage} category={"all"} currentPage={page}></Pagenation>
        </div>
      </div>
    </div>
  );
};

export default Main;
