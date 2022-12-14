// import clinets from "../Icons/clinets.svg";
import React from "react";
import classes from "../Pages/HomePage.module.css";
import arrowR from "../Icons/arrowR.svg";
import mangeIcon from "../Icons/mange.svg";
import designIcon from "../Icons/Desgin.svg";
import order from "../Icons/order.svg";
import Settings from "../Icons/Settings.svg";
import BellSide from "../Icons/BellSide.svg";
import statica from "../Icons/static.svg";
import tarrif from "../Icons/tarrif.svg";
import QRIcon from "../Icons/QRcodeIcon.svg";
import orderService from "../Icons/orderServicee.svg";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SideNavigation = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [waitLogo, setWaitLogo] = useState(false);
  const userLogo = useSelector((state) => state.controler.user_logo);
  const userLogoText = useSelector((state) => state.controler.user_logo_text);

  const userLang = useSelector(
    (state) => state.controler.user_first_language
  ).toLowerCase();

  const userDomain = useSelector((state) => state.controler.user_domain);
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${userDomain}`;

  const navigate = useNavigate();

  useEffect(() => {
    changeLanguage(userLang);

    setTimeout(() => {
      setWaitLogo(true);
    }, 500);
  }, []);

  const goHomeforNow = () => {
    navigate("/home", {
      replace: true,
    });
  };

  return (
    <React.Fragment>
      <div className={classes.sideNavBox}>
        <Link to="/home" className={classes.logoArea}>
          {waitLogo && (
            <div
              className={classes.logoImg}
              style={{
                backgroundImage: `url("${URL}/${userLogo}")`,
              }}
            ></div>
          )}

          <p className={classes.logoText}>{userLogoText}</p>
        </Link>

        <div className={classes.actionArea}>
          <h2 className={classes.actionHeading}>{t("restaurantNav")}</h2>
          <div className={classes.actionBox}>
            <NavLink
              to="/home"
              onClick={goHomeforNow}
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img
                  alt="icon"
                  src={mangeIcon}
                  className={classes.actionIcon}
                />

                <span className={classes.actionText}>{t("managementNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/orders"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img alt="icon" src={order} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("ordersNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/waiter"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img alt="icon" src={BellSide} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("waiterNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/ordersService"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img
                  alt="icon"
                  src={orderService}
                  className={classes.actionIcon}
                />

                <span className={classes.actionText}>
                  {t("orderServiceNav")}
                </span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/qr"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img alt="icon" src={QRIcon} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("QRcodesNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/design-menu"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img
                  alt="icon"
                  src={designIcon}
                  className={classes.actionIcon}
                />

                <span className={classes.actionText}>{t("designMenuNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>

            <NavLink
              to="/settings"
              className={(navData) =>
                navData.isActive
                  ? classes.activeSideLink
                  : classes.notActiveSideLink
              }
            >
              <div className={classes.iconTextArea}>
                <img alt="icon" src={Settings} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("settingsNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </NavLink>
          </div>
          <h2 className={classes.actionHeading}>??????????????</h2>
          <div className={classes.actionBox}>
            <a className={classes.notActiveSideLink}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={tarrif} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("tariffsNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </a>

            <a className={classes.notActiveSideLink}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={statica} className={classes.actionIcon} />

                <span className={classes.actionText}>{t("statisticsNav")}</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideNavigation;
