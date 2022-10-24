import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import { useEffect } from "react";
import classes from "./HomePage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const DesignMenuPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const serverAPI = useSelector((state) => state.controler.serverAPI);
  // const userEmail = useSelector((state) => state.controler.user_email);
  // const userPassword = useSelector((state) => state.controler.user_password);
  // const userServiceID = useSelector((state) => state.controler.user_service_ID);

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
                    ВАШЕ АКТИВНОЕ МЕНЮ: МЕНЮ 1
                  </h1>
                </div>
              </div>

              <div className={classes.designMenusContainer}></div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(DesignMenuPage);
