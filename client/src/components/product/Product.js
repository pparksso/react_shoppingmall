import "../../scss/main.scss";
import Item from "../items/Item";
import Pagenation from "../main/Pagination";

const Product = ({ count, totalPage, startPage, lastPage, page, item, category }) => {
  return (
    <div className="main">
      <div className="itemList">
        <div className="titleBox">
          <span className="category">{category}</span>
          <span className="number">({count})</span>
        </div>
        <div className="container">
          <div className="categoryItems items">
            <ul className="itemList">
              {item.map((item, idx) => {
                return <Item key={idx} itemInfo={item} />;
              })}
            </ul>
          </div>
          <Pagenation totalPage={totalPage} startPage={startPage} lastPage={lastPage} currentPage={page}></Pagenation>
        </div>
      </div>
    </div>
  );
};

export default Product;
