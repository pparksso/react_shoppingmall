import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import Weekly from "../items/Weekly";
import All from "../items/All";
import Pagenation from "../main/Pagination";

const Main = () => {
  const [best, setBest] = useState([]);
  const [all, setAll] = useState([]);
  const [count, setCount] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios({
      url: "http://localhost:8080/item/best",
    }).then((res) => {
      setBest(res.data.items);
    });
  }, []);
  useEffect(() => {
    axios({
      url: "http://localhost:8080/item/category/all",
    }).then((res) => {
      setAll(res.data.item);
      setCount(res.data.item.length);
    });
  }, []);
  const indexOfLast = currentPage * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentPosts = (all) => {
    let currentPosts = 0;
    currentPosts = all.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
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
              {currentPosts.map((item, idx) => {
                return <All key={idx} itemInfo={item} />;
              })}
            </ul>
            <Pagenation limit={limit} total={all.length} paginate={setCurrentPage}></Pagenation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
