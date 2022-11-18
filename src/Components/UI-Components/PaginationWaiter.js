import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import classes from "../Pages/HomePage.module.css";
import { useSelector } from "react-redux";

const PaginationWaiter = () => {
  const WaiterData = useSelector((state) => state.controler.user_waitor_data);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 11;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(WaiterData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(WaiterData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, WaiterData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % WaiterData.length;
    setItemOffset(newOffset);
  };

  const convertTime = (date) => {
    return new Date(date).toLocaleString().slice(0, -2);
  };

  return (
    <React.Fragment>
      {currentItems.map((ele) => (
        <div className={classes.wholeItemWaiter} key={ele.id}>
          <span className={classes.waiterOption}>{ele.table_name}</span>
          <span
            className={`${classes.waiterOption} ${classes.waiterOptionTime}`}
          >
            {convertTime(ele.date_start)}
          </span>
          <span className={classes.waiterOptionStatus}>{ele.status}</span>
        </div>
      ))}

      {WaiterData.length <= 6 ? (
        ""
      ) : (
        <ReactPaginate
          pageLinkClassName={classes.paginLink}
          className={classes.pagination}
          activeClassName={classes.activePagin}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      )}
    </React.Fragment>
  );
};

export default PaginationWaiter;
