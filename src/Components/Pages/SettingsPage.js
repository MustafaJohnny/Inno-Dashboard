import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import ChangeClientName from "../UI-Components/ChangeClientName";
import EditIcon from "../Icons/Edit.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import classes from "./SettingsQRPages.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showChangeClient = useSelector(
    (state) => state.controler.show_change_client_name
  );

  const displayChangeClientName = () => {
    dispatch(controlActions.toggleChangeClientName());
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };
  return (
    <React.Fragment>
      <section>
        {showChangeClient && <ChangeClientName />}
        <SideNavigation />
        <UpNavigation />
        <main className={classes.mainContiner}>
          <div className={classes.headingBackArea}>
            <img
              onClick={goPageBack}
              src={ArrowBack}
              alt="icon"
              className={classes.arrowBack}
            />
            <h1 className={classes.settingsHeading}>Настройки</h1>
          </div>
          <div className={classes.settingsBox}>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>
                Название заведения
              </h2>
              <button
                onClick={displayChangeClientName}
                type="button"
                className={classes.settingBtn}
              >
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Логотип</h2>
              <button type="button" className={classes.settingBtn}>
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Вызов официанта</h2>
              <button className={classes.activeMenu} type="button">
                Активный
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Доставка</h2>
              <button className={classes.notActiveMenu} type="button">
                Неактивный
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Сайт</h2>
              <button className={classes.activeMenu} type="button">
                Активный
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>
                Мобильное приложение
              </h2>
              <button className={classes.activeMenu} type="button">
                Активный
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Валюта</h2>
              <button type="button" className={classes.settingBtn}>
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button>
            </div>
            <div className={classes.wholeSetting}>
              <h2 className={classes.wholeSettingHeading}>Домен</h2>
              <button type="button" className={classes.settingBtn}>
                <img
                  src={EditIcon}
                  alt="icon"
                  className={classes.settingIcon}
                />
              </button>
            </div>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(SettingsPage);
