import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import AddServiceItem from "../UI-Components/AddServiceItem";
import classes from "./HomePage.module.css";
import editIcon from "../Icons/Edit.svg";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDomain = useSelector((state) => state.controler.user_domain);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userServiceID = useSelector((state) => state.controler.user_service_ID);

  // Testing

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/dash/uslugi_list/${userServiceID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserServiceItems(request.data));
      }
    };
    getData();
  }, []);

  //Testing

  const showAddItemService = useSelector(
    (state) => state.controler.show_add_service_items
  );

  const userServiceItems = useSelector(
    (state) => state.controler.user_service_items
  );

  const pageHeading = useSelector(
    (state) => state.controler.services_page_heading
  );

  const showModalItem = () => {
    dispatch(controlActions.toggleShowAddServiceItems());
  };

  return (
    <React.Fragment>
      <section>
        {showAddItemService && <AddServiceItem />}
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.servicesContainer}>
              <div className={classes.managementBtnsArea}>
                <h1 className={classes.managementHeading}>{pageHeading}</h1>
                <div className={classes.twoBtnsManage}>
                  <button className={classes.manageBtn} type="button">
                    Редактировать сервис
                  </button>
                  <button
                    className={classes.manageBtn}
                    type="button"
                    onClick={showModalItem}
                  >
                    + Добавить услугу
                  </button>
                </div>
              </div>

              <div className={classes.serviceItemsBox}>
                <div className={classes.multiHeadingServices}>
                  <span className={classes.servicesHeading}>Название</span>
                  <span className={classes.servicesHeading}>Цена</span>
                  <span className={classes.servicesHeading}>Описание</span>
                </div>
                {userServiceItems.map((element) => (
                  <div key={element.id} className={classes.wholeItemService}>
                    <span className={classes.serviceName}>{element.name}</span>
                    <span className={classes.servicePrice}>
                      {element.price}
                    </span>
                    <span className={classes.serviceDescription}>
                      {element.description}
                    </span>
                    <div className={classes.service2btnArea}>
                      <button
                        type="button"
                        className={classes.serviceActiveBtn}
                      >
                        Активный
                      </button>

                      <button type="button" className={classes.editServiceBtn}>
                        <img
                          className={classes.editIcon}
                          alt="icon"
                          src={editIcon}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(ServicesPage);
