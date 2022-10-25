import React from "react";
import axios from "axios";
import LogOut from "../Icons/LogOut.svg";
import OrderNav from "../Icons/OrderNav.svg";
import WaiterNav from "../Icons/WaiterNav.svg";
import ServiceNav from "../Icons/ServiceNav.svg";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../Pages/HomePage.module.css";
import { controlActions } from "../Redux/ReduxStore";

const UpNavigation = () => {
  const updatesNotification = useCallback(
    () =>
      setInterval(() => {
        let mounted = true;

        const getData = async () => {
          const request = await axios.get(
            `http://${serverAPI}/api/dash/client_data`,
            {
              auth: {
                username: userEmail,
                password: userPassword,
              },
              headers: { accept: "application/json" },
            }
          );

          if (mounted) {
            dispatch(controlActions.getUserNotificationStates(request.data));
          }
        };

        getData();
      }, 6000),
    []
  );

  updatesNotification();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userName = useSelector((state) => state.controler.user_name);
  const userRole = useSelector((state) => state.controler.user_role);

  const orderNotif = useSelector((state) => state.controler.user_order_notifi);

  const garsonNotif = useSelector(
    (state) => state.controler.user_garson_notifi
  );
  const serviceNotif = useSelector(
    (state) => state.controler.user_service_notifi
  );

  const logOutAndReset = () => {
    window.localStorage.clear();
    window.localStorage.removeItem("persist:root");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <React.Fragment>
      <header className={classes.upHeader}>
        <div className={classes.headerIconsBox}>
          <div className={classes.iconHeaderBack1}>
            <img alt="icon" className={classes.headerIcon} src={OrderNav} />
            {orderNotif === 0 ? (
              ""
            ) : (
              <span className={`${classes.notifNum} ${classes.notifNum1}`}>
                {orderNotif}
              </span>
            )}
          </div>
          <div className={classes.iconHeaderBack2}>
            <img alt="icon" className={classes.headerIcon} src={WaiterNav} />
            {garsonNotif === 0 ? (
              ""
            ) : (
              <span className={`${classes.notifNum} ${classes.notifNum2}`}>
                {garsonNotif}
              </span>
            )}
          </div>
          <div className={classes.iconHeaderBack3}>
            <img alt="icon" className={classes.headerIcon} src={ServiceNav} />
            {serviceNotif === 0 ? (
              ""
            ) : (
              <span className={`${classes.notifNum} ${classes.notifNum3}`}>
                {serviceNotif}
              </span>
            )}
          </div>
        </div>
        <div className={classes.logingArea}>
          <div className={classes.nameRoleArea}>
            <span className={classes.userName}>{userName}</span>
            <span className={classes.userRole}>{userRole}</span>
          </div>
          <button onClick={logOutAndReset} className={classes.logOutBtn}>
            <img alt="icon" src={LogOut} className={classes.logOutIcon} />
          </button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default React.memo(UpNavigation);
