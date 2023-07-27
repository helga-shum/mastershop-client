import React, { useState } from "react";
import { setCurrentPage } from "../../store/filter";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import styles from "./paginate.module.css";

function Paginate() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  console.log(page);
  const handlePageClick = ({ selected: selectedPage }) => {
    dispatch(setCurrentPage(selectedPage));
    setPage(selectedPage);
    console.log(selectedPage);
  };
  const { countPages } = useSelector((state) => state.cards);
  return (
    <>
      <ReactPaginate
        containerClassName={styles.container}
        pageClassName={styles.list}
        pageLinkClassName={styles.links}
        activeLinkClassName={styles.active}
        nextLinkClassName={styles.next}
        previousLinkClassName={styles.prev}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={countPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        forcePage={page}
      />
    </>
  );
}

export default Paginate;
