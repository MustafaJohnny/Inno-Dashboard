import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import Pagination from "../UI-Components/Pagination";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const WaiterPage = () => {
  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/dash/client_garson`,
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
      }
    };

    getData();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const userWaiterData = useSelector(
    (state) => state.controler.user_waitor_data
  );

  console.log(userWaiterData);

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
                  <h1 className={classes.managementHeading}>Вызов официанта</h1>
                </div>
              </div>

              <div className={classes.serviceItemsBox}>
                <div className={classes.multiHeadingWaiter}>
                  <span className={classes.waiterHeading}>Номер стола</span>
                  <span className={classes.waiterHeading}>Время</span>
                  <span className={classes.waiterHeading}>Статус</span>
                </div>

                <Pagination />
                {/* 
                <div className={classes.wholeItemWaiter}>
                  <span className={classes.waiterOption}>room cleaing</span>
                  <span className={classes.waiterOption}>89</span>
                  <span className={classes.waiterOption}>
                    very good service
                  </span>
                  <span className={classes.waiterOptionStatus}>
                    В обработке
                  </span>
                </div> */}
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(WaiterPage);
