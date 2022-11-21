import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import PaginationOrders from "../UI-Components/PaginationOrders";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const OrdersPage = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const OrdersNotif = useSelector((state) => state.controler.user_order_notifi);

  const userLang = useSelector(
    (state) => state.controler.user_first_language
  ).toLowerCase();

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
        changeLanguage(userLang);
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
                  <h1 className={classes.managementHeading}>
                    {t("orderHead")}
                  </h1>
                </div>
              </div>

              {userOrders.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeading}>
                  <h1 className={classes.emptyMsgHomePage}>
                    {t("emptyOrders")}
                  </h1>
                </div>
              ) : (
                <div className={classes.waiterItemsBox}>
                  <div
                    className={`${classes.multiHeadingWaiter} ${classes.multiHeadingWaiter3}`}
                  >
                    <span className={classes.waiterHeading}>
                      {t("orderNum")}
                    </span>
                    <span
                      className={`${classes.waiterHeading} ${classes.timeOrderHeadingMove}`}
                    >
                      {t("orderTime")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderTable")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderStatus")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderPrice")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderPayType")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderPayStatus")}
                    </span>
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
