import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  const no = parseInt(params.no);
  console.log(no);
  useEffect(() => {
    axios({
      url: `http://localhost:8080/item?no=${no}`,
    }).then((res) => {
      console.log(res.data);
    });
  }, []);
  return <div className="detail"></div>;
};

export default Detail;
