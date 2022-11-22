import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import AddServiceItem from "../UI-Components/AddServiceItem";
import EditServiceItem from "../UI-Components/EditServiceItem";
import DeleteOptionalModal from "../UI-Components/DeleteOptionalModal";
import { useTranslation } from "react-i18next";
import actionBin from "../Icons/actionBin.svg";
import actionPen from "../Icons/actionPen.svg";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";
import FallMessage from "../UI-Components/FallMessage";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userServiceID = useSelector((state) => state.controler.user_service_ID);
  const userCurrency = useSelector((state) => state.controler.user_currency);

  const spinnerServices = useSelector(
    (state) => state.controler.show_spinner_service
  );

  const fallServices = useSelector(
    (state) => state.controler.show_fall_services
  );

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/serv/uslugi_list/${userServiceID}`,
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
        changeLanguage(userLanguage.toLowerCase());
      }
    };
    getData();
  }, []);

  const showAddItemService = useSelector(
    (state) => state.controler.show_add_service_items
  );

  const showEditItemService = useSelector(
    (state) => state.controler.show_edit_service_item
  );

  const showDeleteItemService = useSelector(
    (state) => state.controler.show_delete_service_item
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

  const activateOrDeactivateServiceItem = (serviceItemID) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/api/serv/uslugi_active_or_deactivate/${serviceItemID}`,
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

  // Code for editing and deleting service items..

  const displayEditServiceItem = (ServiceItemIndex) => {
    dispatch(
      controlActions.getEditServiceItemData(userServiceItems[ServiceItemIndex])
    );
    dispatch(controlActions.toggleEditServiceItem());
  };

  const displayDeleteServiceItem = (serviceItemID) => {
    dispatch(controlActions.toggleDeleteServiceItem(serviceItemID));
    dispatch(controlActions.getDeleteSomething(t("justServiceItem")));
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {spinnerServices && <LoadingSpinner2 />}
        {fallServices && <FallMessage />}
        {showAddItemService && <AddServiceItem />}
        {showEditItemService && <EditServiceItem />}
        {showDeleteItemService && <DeleteOptionalModal />}
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
                  <h1 className={classes.managementHeading}>{pageHeading}</h1>
                </div>
                <div className={classes.twoBtnsManage}>
                  <button
                    className={classes.manageBtn}
                    type="button"
                    onClick={showModalItem}
                  >
                    + {t("addServiceItem")}
                  </button>
                </div>
              </div>

              {userServiceItems.length <= 0 ? (
                <div className={classes.emptyMsgInnerHeadingService}>
                  <h1 className={classes.emptyMsgHomePage}>
                    Вы еще не добавили сервис
                  </h1>
                </div>
              ) : (
                <div className={classes.serviceItemsBox}>
                  <div className={classes.multiHeadingServices}>
                    <span className={classes.servicesHeading}>
                      {t("justName")}
                    </span>
                    <span className={classes.servicesHeading}>
                      {t("orderPrice")}
                    </span>
                    <span className={classes.servicesHeading}>
                      {t("justDescrip")}
                    </span>
                  </div>
                  {userServiceItems.map((element, index) => (
                    <div key={element.id} className={classes.wholeItemService}>
                      <span className={classes.serviceName}>
                        {element.name}
                      </span>
                      <span className={classes.servicePrice}>
                        {`${element.price} ${userCurrency}`}
                      </span>
                      <span className={classes.serviceDescription}>
                        {element.description}
                      </span>
                      <div className={classes.service2btnArea}>
                        <button
                          onClick={() =>
                            activateOrDeactivateServiceItem(element.id)
                          }
                          className={
                            element.is_active
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {element.is_active ? t("active") : t("notActive")}
                        </button>

                        <button
                          onClick={() => displayDeleteServiceItem(element.id)}
                          className={classes.deleteWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionBin}
                          />
                        </button>

                        <button
                          onClick={() => displayEditServiceItem(index)}
                          className={classes.editWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionPen}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(ServicesPage);
