import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ArrowDown from "../Icons/ArrowD.svg";
import Pen from "../Icons/Pen.svg";
import DeleteIcon from "../Icons/Delete.svg";
import classes from "../Pages/HomePage.module.css";
import { useSelector, useDispatch } from "react-redux";

const PaginationOrders = () => {
  // This whole codes is only for the pagination of the orders.
  const userOrders = useSelector((state) => state.controler.user_all_orders);
  const userCurrency = useSelector((state) => state.controler.user_currency);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(userOrders.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userOrders.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, userOrders]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userOrders.length;
    setItemOffset(newOffset);
  };

  const convertTime = (date) => {
    return new Date(date).toLocaleString().slice(0, -2);
  };
  //////////////////////////////////////////////////////////////////////////////

  // From here this part of code is responsible for controling the orders and anything about them.
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const getAllOrderInfo = (event) => {
    const clickedOrderId = event.target.id;

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/ord_rest/order_one/${clickedOrderId}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        console.log(request.data);
      }
    };
    getData();
  };

  return (
    <React.Fragment>
      {currentItems.map((ele) => (
        <div className={classes.wholeAllOrders} key={ele.id}>
          <span className={`${classes.waiterOption} `}>
            {ele.id.toString().length === 1 ? `0${ele.id}` : ele.id}
          </span>
          <span className={`${classes.waiterOption}`}>
            {convertTime(ele.date_start)}
          </span>
          <span className={`${classes.waiterOption} ${classes.orderTableMove}`}>
            {ele.table_name.toString().length === 1
              ? `0${ele.table_name}`
              : ele.table_name}
          </span>
          <span className={`${classes.waiterOption} ${classes.orderPriceMove}`}>
            {!ele.summa ? "" : `${ele.summa} ${userCurrency}`}
          </span>

          <div className={`${classes.orderOpBox} ${classes.orderStatusMove}`}>
            <span className={`${classes.orderOptionStatus} `}>
              {ele.status}
            </span>
            <img className={classes.arrowDownIcon} alt="icon" src={ArrowDown} />
          </div>

          <div className={`${classes.orderOpBox} ${classes.orderTypeMove}`}>
            <span className={`${classes.waiterOption} `}>{ele.pay_type}</span>
            <img className={classes.arrowDownIcon} alt="icon" src={ArrowDown} />
          </div>

          <div
            className={`${classes.orderOpBox} ${classes.orderStatusPayMove}`}
          >
            <span className={`${classes.waiterOption} `}>{ele.pay_status}</span>
            <img className={classes.arrowDownIcon} alt="icon" src={ArrowDown} />
          </div>

          <div className={classes.ordersOptionsBoxx}>
            <img className={classes.arrowDownIcon} alt="icon" src={Pen} />
            <img
              className={classes.arrowDownIcon}
              alt="icon"
              src={DeleteIcon}
            />
            <img
              onClick={getAllOrderInfo}
              className={classes.arrowDownIcon}
              alt="icon"
              src={ArrowDown}
              id={ele.id}
            />
          </div>
        </div>
      ))}

      {userOrders.length <= 6 ? (
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

export default PaginationOrders;
