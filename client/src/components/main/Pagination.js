import { useDispatch } from "react-redux";
import { goPage } from "../../store/slice/product";

const Pagination = ({ totalPage, startPage, lastPage, currentPage }) => {
  const dispatch = useDispatch();
  const pageNumbers = [];
  if (lastPage < totalPage) {
    for (let i = startPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  } else if ((lastPage = totalPage)) {
    for (let i = startPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className="pagination">
      {startPage > 5 ? (
        <button onClick={() => dispatch(goPage({ num: startPage - 1 }))}>
          <span class="material-icons">chevron_left</span>
        </button>
      ) : null}
      {pageNumbers.map((num, idx) => {
        return (
          <li key={idx} className={currentPage === num ? "on" : null}>
            <button onClick={() => dispatch(goPage({ num }))}>
              <span>{num}</span>
            </button>
          </li>
        );
      })}
      {totalPage > lastPage ? (
        <button onClick={() => dispatch(goPage({ num: lastPage + 1 }))}>
          <span class="material-icons">chevron_right</span>
        </button>
      ) : null}
    </ul>
  );
};

export default Pagination;
