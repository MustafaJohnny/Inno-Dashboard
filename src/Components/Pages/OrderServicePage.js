import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import PaginationServices from "../UI-Components/PaginationServices";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const OrderServicePage = () => {
  const serviceNotif = useSelector(
    (state) => state.controler.user_service_notifi
  );

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const userLang = useSelector(
    (state) => state.controler.user_first_language
  ).toLowerCase();

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/ord_serv/client_uslugi`,
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
        dispatch(controlActions.getUserOrdersServices(request.data));
        changeLanguage(userLang);
      }
    };

    getData();
  }, [serviceNotif]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const ordersServices = useSelector(
    (state) => state.controler.user_orders_services
  );

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
                    {t("orderServiceNav")}
                  </h1>
                </div>
              </div>

              {ordersServices.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeading}>
                  <h1 className={classes.emptyMsgHomePage}>
                    {t("emptyServiceOrder")}
                  </h1>
                </div>
              ) : (
                <div className={classes.waiterItemsBox}>
                  <div
                    className={`${classes.multiHeadingWaiter} ${classes.multiHeadingWaiter2}`}
                  >
                    <span className={classes.waiterHeading}>
                      {t("tableNum")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("justName")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderTime")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderPrice")}
                    </span>
                    <span
                      className={`${classes.waiterHeading} ${classes.orderServiceStatusHead}`}
                    >
                      {t("status")}
                    </span>
                  </div>

                  <PaginationServices />
                </div>
              )}
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(OrderServicePage);
