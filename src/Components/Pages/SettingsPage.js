import React from "react";
import Pen from "../Icons/Pen.svg";
import ArrowBack from "../Icons/ArrowBack.svg";
import ChangeClientName from "../UI-Components/ChangeClientName";
import ChangeClientLogo from "../UI-Components/ChangeClientLogo";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import { useTranslation } from "react-i18next";
import classes from "./SettingsQRPages.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { controlActions } from "../Redux/ReduxStore";

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userCurrency = useSelector((state) => state.controler.user_currency);
  const userDomain = useSelector((state) => state.controler.user_domain);

  const showChangeLogo = useSelector(
    (state) => state.controler.show_change_client_logo
  );

  const showChangeClient = useSelector(
    (state) => state.controler.show_change_client_name
  );

  const garsonCallState = useSelector(
    (state) => state.controler.user_garson_call_status
  );

  const basketMenuState = useSelector(
    (state) => state.controler.user_basket_menu_status
  );

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

  const displayChangeClientName = () => {
    dispatch(controlActions.toggleChangeClientName());
  };

  const displayChangeClientLogo = () => {
    dispatch(controlActions.toggleChangeClientLogo());
  };

  // const editSettingsAndSendPatch = (setting) => {
  //   axios
  //     .patch(`${process.env.REACT_APP_URL}/api/dash/${setting}ClientChange`, "", {
  //       params: {},
  //       auth: {
  //         username: userEmail,
  //         password: userPassword,
  //       },
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //     .then((response) => {
  //       if ((response.status = "200")) {
  //         dispatch(controlActions.getUserDataAfterLogin(response.data));
  //       }
  //     });
  // };

  // const activateOrDeactivateWaiter = () => {
  //   editSettingsAndSendPatch("garson");
  // };

  // const activateOrDeactivateOrderMenu = () => {
  //   editSettingsAndSendPatch("order");
  // };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };
  return (
    <React.Fragment>
      <section>
        {showChangeClient && <ChangeClientName />}
        {showChangeLogo && <ChangeClientLogo />}
        <SideNavigation />
        <div className={classes.contentBigBox}>
          <UpNavigation />
        </div>
        <main className={classes.mainContiner}>
          <div className={classes.headingBackArea}>
            <img
              onClick={goPageBack}
              src={ArrowBack}
              alt="icon"
              className={classes.arrowBack}
            />
            <h1 className={classes.settingsHeading}>{t("settingsNav")}</h1>
          </div>
          <div className={classes.settingsBox}>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>{t("ownerName")}</h2>
              <button
                onClick={displayChangeClientName}
                type="button"
                className={classes.settingBtn}
              >
                <img src={Pen} alt="icon" className={classes.settingIcon} />
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>{t("logo")}</h2>
              <button
                onClick={displayChangeClientLogo}
                type="button"
                className={classes.settingBtn}
              >
                <img src={Pen} alt="icon" className={classes.settingIcon} />
              </button>
            </div>
            {/* <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>?????????? ??????????????????</h2>

              <button
                onClick={activateOrDeactivateWaiter}
                className={
                  garsonCallState ? classes.activeMenu : classes.notActiveMenu
                }
                type="button"
              >
                {garsonCallState ? "????????????????" : "????????????????????"}
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>?????????????? ?? ????????</h2>
              <button
                onClick={activateOrDeactivateOrderMenu}
                className={
                  basketMenuState ? classes.activeMenu : classes.notActiveMenu
                }
                type="button"
              >
                {basketMenuState ? "????????????????" : "????????????????????"}
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>????????????????</h2>
              <button className={classes.notActiveMenu} type="button">
                ????????????????????
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>????????</h2>
              <button className={classes.activeMenu} type="button">
                ????????????????
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>
                ?????????????????? ????????????????????
              </h2>
              <button className={classes.activeMenu} type="button">
                ????????????????
              </button>
            </div> */}
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>{t("currency")}</h2>
              <span className={classes.wholeSettingHeadValue}>
                {userCurrency}
              </span>
              {/* <button type="button" className={classes.settingBtn}>
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button> */}
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>{t("domain")}</h2>
              <span className={classes.wholeSettingHeadValue}>
                {userDomain}
              </span>
              {/* <button type="button" className={classes.settingBtn}>
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button> */}
            </div>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(SettingsPage);
