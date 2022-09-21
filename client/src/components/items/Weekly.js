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
          <Link to="">
            <div className="top">
              <div className="num">
                <span>{idx + 1}</span>
              </div>
              <button className="emptyHeart">
                <span class="material-icons">favorite_border</span>
              </button>
            </div>
            <div className="imgBox" style={bg}></div>
          </Link>
          <div className="txtBox">
            <Link to="">
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
