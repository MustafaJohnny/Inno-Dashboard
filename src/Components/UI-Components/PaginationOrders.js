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

  const clickedOrderDetail = useSelector(
    (state) => state.controler.user_order_detail_per_click
  );

  console.log(clickedOrderDetail);

  const OrderClassNameHide = `${classes.containerForOrdersDetails} ${classes.hiddenComponent}`;
  const OrderClassNameShow = classes.containerForOrdersDetails;

  const WholeOrderClassNameHide = classes.containerForAllOrders;
  const wholeOrderClassNameShow = `${classes.containerForAllOrders} ${classes.bigOrderContShow}`;

  const [clicked, setClicked] = useState(false);

  const getAllOrderInfo = (clickedOrderId, index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);

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
      }
    };
    getData();
  };

  return (
    <React.Fragment>
      {currentItems.map((ele, index) => (
        <div
          key={ele.id}
          className={
            clicked === index
              ? wholeOrderClassNameShow
              : WholeOrderClassNameHide
          }
        >
          <div
            onClick={() => getAllOrderInfo(ele.id, index)}
            className={classes.wholeAllOrders}
          >
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
                onClick={() => getAllOrderInfo(ele.id, index)}
                className={
                  clicked === index
                    ? `${classes.arrowDownIcon} ${classes.arrowDownRotate}`
                    : classes.arrowDownIcon
                }
                alt="icon"
                src={ArrowDown}
                id={ele.id}
              />
            </div>
          </div>
          {clickedOrderDetail.map((element) => (
            <div
              key={element.id}
              className={
                clicked === index ? OrderClassNameShow : OrderClassNameHide
              }
            >
              <div className={classes.aWholeOrderDetailsBox}>
                <div className={classes.orderNameAndModfixBox}>
                  <h2 className={classes.perOrderName}>{element.name}</h2>
                  <ul className={classes.orderModfixBox}>
                    {element.modifex.map((eleModifex, index) => (
                      <li className={classes.modifEL} key={index}>
                        {eleModifex.name}: {eleModifex.datamodifex[0].name}
                      </li>
                    ))}
                    {/* {  <li className={classes.modifEL}>топпинги: моцарелла</li>} */}
                  </ul>
                </div>
                <div className={classes.orderCounterPriceBox}>
                  <div className={classes.OrderTheCounterBox}>
                    {/* <span className={classes.counterAreaHeading}>ЦЕНА:</span> */}
                    <span
                      className={classes.perOrderPrice}
                    >{`${element.price} ${userCurrency}`}</span>
                  </div>
                  <div className={classes.OrderTheCounterBox}>
                    {/* <span className={classes.counterAreaHeading}>
                      КОЛИЧЕСТВО:
                    </span> */}
                    <div className={classes.OrderCounterBox}>
                      <button type="button" className={classes.counterMinusBtn}>
                        <span>-</span>
                      </button>
                      <span className={classes.orderCounterValue}>
                        {element.cartQuantity}
                      </span>
                      <button type="button" className={classes.counterPlusBtn}>
                        <span>+</span>
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
          ))}
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
