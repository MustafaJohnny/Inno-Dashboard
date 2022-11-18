import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import PaginationOrders from "../UI-Components/PaginationOrders";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const OrdersPage = () => {
  const OrdersNotif = useSelector((state) => state.controler.user_order_notifi);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/ord_rest/order_list`,
        {
          params: {
            offset: "0",
            limit: "100",
          },
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserAllOrders(request.data));
      }
    };

    getData();
  }, [OrdersNotif]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userOrders = useSelector((state) => state.controler.user_all_orders);

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.servicesContainer}>
              <div className={classes.managementBtnsArea}>
                <div className={classes.headArrowArea}>
                  <img
                    onClick={goPageBack}
                    src={ArrowBack}
                    alt="icon"
                    className={classes.arrowBack}
                  />
                  <h1 className={classes.managementHeading}>Заказы</h1>
                </div>
              </div>

              {userOrders.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeading}>
                  <h1 className={classes.emptyMsgHomePage}>
                    У вас еще нет заказов...
                  </h1>
                </div>
              ) : (
                <div className={classes.waiterItemsBox}>
                  <div
                    className={`${classes.multiHeadingWaiter} ${classes.multiHeadingWaiter3}`}
                  >
                    <span className={classes.waiterHeading}>Номер заказа</span>
                    <span
                      className={`${classes.waiterHeading} ${classes.timeOrderHeadingMove}`}
                    >
                      Время
                    </span>
                    <span className={classes.waiterHeading}>Стол</span>
                    <span className={classes.waiterHeading}>Статус заказа</span>
                    <span className={classes.waiterHeading}>Сумма</span>
                    <span className={classes.waiterHeading}>Тип оплаты</span>
                    <span className={classes.waiterHeading}>Статус оплаты</span>
                  </div>

                  <PaginationOrders />
                </div>
              )}
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(OrdersPage);
