import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userServiceItems = useSelector(
    (state) => state.controler.user_service_items
  );

  const pageHeading = useSelector(
    (state) => state.controler.services_page_heading
  );

  //   const activateOrDeactivateCategory = (menuID) => {
  //     axios
  //       .post(
  //         `http://innomenu.ru/api/v1/menu/menu_active_or_deactivate/${menuID}`,
  //         {},

  //         {
  //           auth: {
  //             username: userEmail,
  //             password: userPassword,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         navigate(0);
  //       });
  //   };

  return (
    <React.Fragment>
      <section>
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.changeContentBox}>
              <div className={classes.managmentContent}>
                <div className={classes.managementBtnsArea}>
                  <h1 className={classes.managementHeading}>{pageHeading}</h1>
                  <div className={classes.twoBtnsManage}>
                    <button className={classes.manageBtn} type="button">
                      Редактировать сервис
                    </button>
                    <button className={classes.manageBtn} type="button">
                      + Добавить услугу
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(ServicesPage);
