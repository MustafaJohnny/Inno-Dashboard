import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import classes from "../Pages/HomePage.module.css";
import { useSelector } from "react-redux";

const PaginationServices = () => {
  const ordersServices = useSelector(
    (state) => state.controler.user_orders_services
  );

  const userCurrency = useSelector((state) => state.controler.user_currency);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(ordersServices.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ordersServices.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, ordersServices]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ordersServices.length;
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
            className={`${classes.waiterOption} ${classes.ServicesOptionNamee}`}
          >
            {ele.uslugi_name}
          </span>
          <span
            className={`${classes.waiterOption} ${classes.ServicesOptionTime}`}
          >
            {convertTime(ele.date_start)}
          </span>

          <span
            className={`${classes.waiterOption} ${classes.ServicesOptionPrice}`}
          >
            {!ele.price ? "" : `${ele.price} ${userCurrency}`}
          </span>
          <span
            className={`${classes.waiterOptionStatus} ${classes.waiterOptionServics}`}
          >
            {ele.status}
          </span>
        </div>
      ))}

      {ordersServices.length <= 6 ? (
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

export default PaginationServices;
