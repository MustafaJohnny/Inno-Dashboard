import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import PaginationServices from "../UI-Components/PaginationServices";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const OrderServicePage = () => {
  const serviceNotif = useSelector(
    (state) => state.controler.user_service_notifi
  );

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/ord_serv/client_uslugi`,
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
      }
    };

    getData();
  }, [serviceNotif]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
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
                  <h1 className={classes.managementHeading}>Заказ услуг</h1>
                </div>
              </div>

              {ordersServices.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeading}>
                  <h1 className={classes.emptyMsgHomePage}>
                    У вас еще нет заказанных услуг...
                  </h1>
                </div>
              ) : (
                <div className={classes.waiterItemsBox}>
                  <div
                    className={`${classes.multiHeadingWaiter} ${classes.multiHeadingWaiter2}`}
                  >
                    <span className={classes.waiterHeading}>Номер стола</span>
                    <span className={classes.waiterHeading}>
                      Название услуги
                    </span>
                    <span className={classes.waiterHeading}>Время</span>
                    <span className={classes.waiterHeading}>Сумма</span>
                    <span className={classes.waiterHeading}>Статус</span>
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
