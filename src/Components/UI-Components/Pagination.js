import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import classes from "../Pages/HomePage.module.css";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const WaiterData = useSelector((state) => state.controler.user_waitor_data);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(WaiterData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(WaiterData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, WaiterData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % WaiterData.length;
    setItemOffset(newOffset);
  };

  return (
    <React.Fragment>
      {currentItems.map((ele) => (
        <div className={classes.wholeItemWaiter} key={ele.id}>
          <span className={classes.waiterOption}>{ele.table_name}</span>
          <span className={classes.waiterOption}>very good service</span>
          <span className={classes.waiterOptionStatus}>В обработке</span>
        </div>
      ))}
      <ReactPaginate
        className={classes.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </React.Fragment>
  );
};

export default Pagination;
