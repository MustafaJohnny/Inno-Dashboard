import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const pageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const userMenus = useSelector((state) => state.controler.user_menus);

  console.log(userMenus);

  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateMenu = (menuID) => {
    axios
      .post(
        `http://innomenu.ru/api/v1/owner/rest_active_or_deactivate/${menuID}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        navigate(0);
      });
  };

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
                      Редактировать ресторан
                    </button>
                    <button className={classes.manageBtn} type="button">
                      + Добавить меню
                    </button>
                  </div>
                </div>

                <div className={classes.managementRestaurents}>
                  {userMenus.map((ele, index) => (
                    <div
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
                      <button
                        onClick={() => activateOrDeactivateMenu(ele.id)}
                        className={
                          ele.is_active
                            ? classes.activeMenu
                            : classes.notActiveMenu
                        }
                        type="button"
                      >
                        {ele.is_active ? "Активный" : "Неактивный"}
                      </button>
                      <div className={classes.packageArea}>
                        <span id={index} className={classes.itemRestHeading}>
                          {ele.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(RestaurantsPage);
