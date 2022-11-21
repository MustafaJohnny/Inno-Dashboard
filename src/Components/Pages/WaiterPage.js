import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import PaginationWaiter from "../UI-Components/PaginationWaiter";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { controlActions } from "../Redux/ReduxStore";

const WaiterPage = () => {
  const garsonNotif = useSelector(
    (state) => state.controler.user_garson_notifi
  );

  const userLang = useSelector(
    (state) => state.controler.user_first_language
  ).toLowerCase();

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/garson/client_garson`,
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
        dispatch(controlActions.getUserWaiterData(request.data));
        changeLanguage(userLang);
      }
    };

    getData();
  }, [garsonNotif]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const WaiterData = useSelector((state) => state.controler.user_waitor_data);

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
                    {t("waiterNav")}
                  </h1>
                </div>
              </div>
              {WaiterData.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeading}>
                  <h1 className={classes.emptyMsgHomePage}>
                    {t("emptyWaiter")}
                  </h1>
                </div>
              ) : (
                <div className={classes.waiterItemsBox}>
                  <div className={classes.multiHeadingWaiter}>
                    <span className={classes.waiterHeading}>
                      {t("tableNum")}
                    </span>
                    <span className={classes.waiterHeading}>
                      {t("orderTime")}
                    </span>
                    <span className={classes.waiterHeading}>{t("status")}</span>
                  </div>

                  <PaginationWaiter />
                </div>
              )}
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(WaiterPage);
