import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import { useSelector } from "react-redux";
import Product from "../product/Product";

const Male = () => {
  const Movepage = useSelector((state) => {
    return state.page.value.num;
  });
  const [all, setAll] = useState([]);
  const [count, setCount] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [startPage, setStartPage] = useState("");
  const [lastPage, setLastPage] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("male");
  useEffect(() => {
    setPage(Movepage);
  }, [Movepage]);
  useEffect(() => {
    axios({
      url: `http://localhost:8080/item/category/${category}?page=${page}`,
    }).then((res) => {
      console.log(res.data);
      setAll(res.data.currentItems);
      setCount(res.data.totalItems);
      setTotalPage(res.data.totalPage);
      setStartPage(res.data.startPage);
      setLastPage(res.data.lastPage);
    });
  }, [page]);
  return (
    <div className="sub">
      <Product count={count} totalPage={totalPage} startPage={startPage} lastPage={lastPage} page={page} item={all} category={category}></Product>
    </div>
  );
};

export default Male;