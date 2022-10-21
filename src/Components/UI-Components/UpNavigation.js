import React from "react";
import LogOut from "../Icons/LogOut.svg";
import OrderNav from "../Icons/OrderNav.svg";
import WaiterNav from "../Icons/WaiterNav.svg";
import ServiceNav from "../Icons/ServiceNav.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../Pages/HomePage.module.css";

const UpNavigation = () => {
  const navigate = useNavigate();

  const userName = useSelector((state) => state.controler.user_name);

  const userRole = useSelector((state) => state.controler.user_role);

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
            <span className={`${classes.notifNum} ${classes.notifNum1}`}>
              2
            </span>
          </div>
          <div className={classes.iconHeaderBack2}>
            <img alt="icon" className={classes.headerIcon} src={WaiterNav} />
            <span className={`${classes.notifNum} ${classes.notifNum2}`}>
              5
            </span>
          </div>
          <div className={classes.iconHeaderBack3}>
            <img alt="icon" className={classes.headerIcon} src={ServiceNav} />
            <span className={`${classes.notifNum} ${classes.notifNum3}`}>
              7
            </span>
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

export default UpNavigation;
