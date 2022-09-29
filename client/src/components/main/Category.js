import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const getCategory = params.category;
  const Movepage = useSelector((state) => {
    return state.page.value.num;
  });
  const [all, setAll] = useState([]);
  const [count, setCount] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [startPage, setStartPage] = useState("");
  const [lastPage, setLastPage] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  useEffect(() => {
    setCategory(getCategory);
  }, [getCategory]);
  useEffect(() => {
    setPage(Movepage);
  });
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
  }, [category, page]);
  return (
    <div className="sub">
      <Product count={count} totalPage={totalPage} startPage={startPage} lastPage={lastPage} page={page} item={all} category={category}></Product>
    </div>
  );
};

export default Category;
