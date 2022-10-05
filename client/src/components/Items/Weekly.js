import React from "react";
import { Link } from "react-router-dom";
const Weekly = ({ itemInfo, idx }) => {
  const bg = {
    backgroundImage: `url(${itemInfo.image[0]})`,
  };
  return (
    <>
      <li>
        <div className="item">
          <Link to={`/detail/${itemInfo.no}`}>
            <div className="top">
              <div className="num">
                <span>{idx + 1}</span>
              </div>
            </div>
            <div className="imgBox" style={bg}></div>
          </Link>
          <div className="txtBox">
            <Link to={`/detail/${itemInfo.no}`}>
              <h2 className="title">{itemInfo.title}</h2>
            </Link>
            <span className="price">{itemInfo.price.toLocaleString()}</span>
          </div>
        </div>
      </li>
    </>
  );
};

export default Weekly;
