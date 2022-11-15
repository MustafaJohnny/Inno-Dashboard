import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import FallMessage from "../UI-Components/FallMessage";
import UpNavigation from "../UI-Components/UpNavigation";
import actionBin from "../Icons/actionBin.svg";
import actionPen from "../Icons/actionPen.svg";
import AddRestaurant from "../UI-Components/AddRestaurant";
import EditRestaurant from "../UI-Components/EditRestaurant";
import EditService from "../UI-Components/EditService";
import AddService from "../UI-Components/AddService";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";
import DeleteOptionalModal from "../UI-Components/DeleteOptionalModal";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDomain = useSelector((state) => state.controler.user_domain);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userServices = useSelector((state) => state.controler.user_services);
  const showFallHome = useSelector((state) => state.controler.show_fall_home);
  const showSpinnerHome = useSelector(
    (state) => state.controler.show_spinner_home
  );

  const userRestaurants = useSelector(
    (state) => state.controler.user_restaurants
  );

  const showAddRestaurant = useSelector(
    (state) => state.controler.show_add_restaurant
  );

  const showEditRestaurant = useSelector(
    (state) => state.controler.show_edit_restaurent
  );

  const showAddService = useSelector(
    (state) => state.controler.show_add_service
  );

  const showEditService = useSelector(
    (state) => state.controler.show_edit_service
  );

  const showDeleteRestaurant = useSelector(
    (state) => state.controler.show_delete_rest
  );

  const showDeleteService = useSelector(
    (state) => state.controler.show_delete_service
  );

  // This one is for getting information about the product owner first time we load the home page
  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/own/restandservice_list`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserDataAfterLogin(request.data));
      }
    };

    getData();
  }, []);

  // This one if for getting the list of languages from the server also first time when we load the home page.
  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(`http://${serverAPI}/api/v1/dict/lang`);

      if (mounted) {
        // Converting the received objects {key: valye} to an array of [key, valye].
        const convertLanguages = request.data
          .map((ele) => Object.entries(ele))
          .map((ele) => ele[0]);

        dispatch(controlActions.getAppLanguages(convertLanguages));
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, []);

  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateMenu = (menuID) => {
    axios
      .post(
        `http://${serverAPI}/api/rest/rest_active_or_deactivate/${menuID}`,
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

  const activateOrDeactivateService = (menuID) => {
    axios
      .post(
        `http://${serverAPI}/api/serv/service_active_or_deactivate/${menuID}`,
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

  const unHideAddRestaurent = () => {
    dispatch(controlActions.toggleAddRestaurant());
  };

  const unHideAddService = () => {
    dispatch(controlActions.toggleAddService());
  };

  const getClickedRestaurant = (event) => {
    const clickedRestaurantID = userRestaurants[event.target.id].id;
    const clickedRestaurantHeading = userRestaurants[event.target.id].name_rest;

    dispatch(controlActions.setRestaurantPageHeading(clickedRestaurantHeading));
    dispatch(controlActions.getUserMenuID(clickedRestaurantID));

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/menu/rest_menu_list/${clickedRestaurantID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserMenus(request.data));
        navigate("/menus", {
          replace: false,
        });
      }
    };
    getData();
  };

  ////////////////////////////////////////////////////////////////////////

  const getClickedService = (event) => {
    const clickedServiceID = userServices[event.target.id].id;
    const clickedServiceHeading = userServices[event.target.id].name_service;

    dispatch(controlActions.setServicesPageHeading(clickedServiceHeading));
    dispatch(controlActions.getUserServiceID(clickedServiceID));

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/serv/uslugi_list/${clickedServiceID}`,
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
        navigate("/services", {
          replace: false,
        });
      }
    };
    getData();
  };

  // The code from here is for editing restaurant and service..
  const displayEditRestaurent = (restaurantIndex) => {
    dispatch(
      controlActions.getEditedRestData(userRestaurants[restaurantIndex])
    );

    dispatch(controlActions.toggleEditRestaurant());
  };

  const displayEditService = (ServiceIndex) => {
    dispatch(controlActions.getEditServiceData(userServices[ServiceIndex]));
    dispatch(controlActions.toggleEditService());
  };

  const displayDeleteRestaurent = (restaurantID) => {
    dispatch(controlActions.toggleDeleteRestaurant(restaurantID));
    dispatch(controlActions.getDeleteSomething("ресторан"));
  };

  const displayDeleteService = (serviceID) => {
    dispatch(controlActions.toggleDeleteService(serviceID));
    dispatch(controlActions.getDeleteSomething("сервис"));
  };

  return (
    <React.Fragment>
      <section>
        {showFallHome && <FallMessage />}
        {showSpinnerHome && <LoadingSpinner2 />}
        {showAddRestaurant && <AddRestaurant />}
        {showEditRestaurant && <EditRestaurant />}
        {showEditService && <EditService />}
        {showAddService && <AddService />}
        {showDeleteRestaurant && <DeleteOptionalModal />}
        {showDeleteService && <DeleteOptionalModal />}
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.changeContentBox}>
              <div className={classes.managmentContent}>
                <div className={classes.managementBtnsArea}>
                  <h1 className={classes.managementHeading}>РЕСТОРАНЫ</h1>
                  <div className={classes.twoBtnsManage}>
                    <button
                      onClick={unHideAddService}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + Добавить сервис
                    </button>
                    <button
                      onClick={unHideAddRestaurent}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + Добавить ресторан
                    </button>
                  </div>
                </div>

                <div className={classes.managementRestaurents}>
                  {userRestaurants.map((ele, index) => (
                    <div
                      onClick={getClickedRestaurant}
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
                      <div className={classes.anItemOnlyActionBox}>
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

                        <button
                          onClick={() => displayEditRestaurent(index)}
                          className={classes.editWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionPen}
                          />
                        </button>

                        <button
                          onClick={() => displayDeleteRestaurent(ele.id)}
                          className={classes.deleteWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionBin}
                          />
                        </button>
                      </div>
                      <div className={classes.packageArea}>
                        <span id={index} className={classes.itemRestHeading}>
                          {ele.name_rest}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={classes.serviceHeadingArea}>
                  <h1 className={classes.managementHeading}>СЕРВИСЫ</h1>
                </div>
                <div className={classes.managementRestaurents}>
                  {userServices.map((ele, index) => (
                    <div
                      onClick={getClickedService}
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
                      <div className={classes.anItemOnlyActionBox}>
                        <button
                          onClick={() => activateOrDeactivateService(ele.id)}
                          className={
                            ele.is_active
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {ele.is_active ? "Активный" : "Неактивный"}
                        </button>

                        <button
                          onClick={() => displayEditService(index)}
                          className={classes.editWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionPen}
                          />
                        </button>

                        <button
                          onClick={() => displayDeleteService(ele.id)}
                          className={classes.deleteWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionBin}
                          />
                        </button>
                      </div>

                      <div className={classes.packageArea}>
                        <span id={index} className={classes.itemRestHeading}>
                          {ele.name_service}
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

export default React.memo(HomePage);
