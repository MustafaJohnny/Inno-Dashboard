import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ArrowDown from "../Icons/ArrowD.svg";
import Pen from "../Icons/Pen.svg";
import DeleteIcon from "../Icons/Delete.svg";
import classes from "../Pages/HomePage.module.css";
import { controlActions } from "../Redux/ReduxStore";
import { useSelector, useDispatch } from "react-redux";

const PaginationOrders = () => {
  // This whole codes is only for the pagination of the orders.
  const userOrders = useSelector((state) => state.controler.user_all_orders);
  const userCurrency = useSelector((state) => state.controler.user_currency);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

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
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const [showOrder, setShowOrder] = useState(true);

  const clickedOrderDetail = useSelector(
    (state) => state.controler.user_order_detail_per_click
  );

  const OrderClassNameHide = `${classes.containerForOrdersDetails} ${classes.hiddenComponent}`;
  const OrderClassNameShow = classes.containerForOrdersDetails;

  const getAllOrderInfo = (event) => {
    setShowOrder(!showOrder);

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
        dispatch(controlActions.getClickedOrderDetail(request.data));
        console.log(request.data);
      }
    };
    getData();
  };

  return (
    <React.Fragment>
      {currentItems.map((ele) => (
        <div key={ele.id} className={classes.containerForAllOrders}>
          <div className={classes.wholeAllOrders}>
            <span className={`${classes.OrderOption} `}>
              {ele.id.toString().length === 1 ? `0${ele.id}` : ele.id}
            </span>
            <span className={`${classes.OrderOption}`}>
              {convertTime(ele.date_start)}
            </span>
            <span
              className={`${classes.OrderOption} ${classes.orderTableMove}`}
            >
              {ele.table_name.toString().length === 1
                ? `0${ele.table_name}`
                : ele.table_name}
            </span>
            <span
              className={`${classes.OrderOption} ${classes.orderPriceMove}`}
            >
              {!ele.summa ? "" : `${ele.summa} ${userCurrency}`}
            </span>

            <div className={`${classes.orderOpBox} ${classes.orderStatusMove}`}>
              <span className={`${classes.orderOptionStatus} `}>
                {ele.status}
              </span>
              <img
                className={classes.arrowDownIcon}
                alt="icon"
                src={ArrowDown}
              />
            </div>

            <div className={`${classes.orderOpBox} ${classes.orderTypeMove}`}>
              <span className={`${classes.OrderOption} `}>{ele.pay_type}</span>
              <img
                className={classes.arrowDownIcon}
                alt="icon"
                src={ArrowDown}
              />
            </div>

            <div
              className={`${classes.orderOpBox} ${classes.orderStatusPayMove}`}
            >
              <span className={`${classes.OrderOption} `}>
                {ele.pay_status}
              </span>
              <img
                className={classes.arrowDownIcon}
                alt="icon"
                src={ArrowDown}
              />
            </div>

            <div className={classes.ordersOptionsBoxx}>
              <img className={classes.perOrderIcon} alt="icon" src={Pen} />
              <img
                className={classes.perOrderIcon}
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

          <div className={showOrder ? OrderClassNameHide : OrderClassNameShow}>
            <div className={classes.aWholeOrderDetailsBox}>
              <div className={classes.orderNameAndModfixBox}>
                <h2 className={classes.perOrderName}>3. Штрудель вишневый</h2>
                <ul className={classes.orderModfixBox}>
                  <li className={classes.modifEL}>вес: 650 гр</li>
                  <li className={classes.modifEL}>корочка: тонкая</li>
                  <li className={classes.modifEL}>размер: средняя (20)</li>
                  <li className={classes.modifEL}>топпинги: моцарелла</li>
                  <li className={classes.modifEL}>убрать ингредиенты: лук</li>
                </ul>
              </div>
              <div className={classes.orderCounterPriceBox}>
                <div className={classes.OrderTheCounterBox}>
                  <span className={classes.counterAreaHeading}>ЦЕНА:</span>
                  <span className={classes.perOrderPrice}>980 РУБ</span>
                </div>
                <div className={classes.OrderTheCounterBox}>
                  <span className={classes.counterAreaHeading}>
                    КОЛИЧЕСТВО:
                  </span>
                  <div className={classes.OrderCounterBox}>
                    <button type="button" className={classes.counterMinusBtn}>
                      -
                    </button>
                    <span className={classes.orderCounterValue}>1</span>
                    <button type="button" className={classes.counterPlusBtn}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className={classes.perOrderActionBox}>
                <img className={classes.perOrderIcon} alt="icon" src={Pen} />
                <img
                  className={classes.perOrderIcon}
                  alt="icon"
                  src={DeleteIcon}
                />
              </div>
            </div>
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
