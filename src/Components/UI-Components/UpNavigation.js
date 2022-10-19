import React from "react";
import LogOut from "../Icons/LogOut.svg";
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
        <div></div>
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
