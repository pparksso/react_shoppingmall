import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/main.scss";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
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
  }, [Movepage]);
  useEffect(() => {
    axios({
      url: `https://ilbisonte.herokuapp.com/item/category/${getCategory}?page=${page}`,
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
        // console.log(err);
      });
  }, [category, page]);

  return (
    <div className="sub">
      <Product count={count} totalPage={totalPage} startPage={startPage} lastPage={lastPage} page={page} item={all} category={category}></Product>
    </div>
  );
};

export default Category;
