const Pagination = ({ totalPage, startPage, lastPage, category, currentPage }) => {
  const pageNumbers = [];
  if (lastPage > totalPage) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  } else if (lastPage <= totalPage) {
    for (let i = 1; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className="pagination">
      {startPage > 5 ? (
        <button>
          <span class="material-icons">chevron_left</span>
        </button>
      ) : null}
      {pageNumbers.map((num, idx) => {
        return (
          <li key={idx} className={currentPage == num ? "on" : null}>
            <button>
              <span>{num}</span>
            </button>
          </li>
        );
      })}
      {totalPage > lastPage ? (
        <button>
          <span class="material-icons">chevron_right</span>
        </button>
      ) : null}
    </ul>
  );
};

export default Pagination;
