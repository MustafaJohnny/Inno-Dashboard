import React from "react";
import classes from "../Pages/HomePage.module.css";
import arrowR from "../Icons/arrowR.svg";
import mangeIcon from "../Icons/mange.svg";
import clinets from "../Icons/clinets.svg";
import delivery from "../Icons/delivery.svg";
import menu from "../Icons/menu.svg";
import order from "../Icons/order.svg";
import review from "../Icons/review.svg";
import Settings from "../Icons/Settings.svg";
import statica from "../Icons/static.svg";
import tarrif from "../Icons/tarrif.svg";
import user from "../Icons/user.svg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SideNavigation = () => {
  const [waitLogo, setWaitLogo] = useState(false);
  const userLogo = useSelector((state) => state.controler.user_logo);
  const userLogoText = useSelector((state) => state.controler.user_logo_text);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${userDomain}`;

  const navigate = useNavigate();

  useEffect(() => {
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
          <h2 className={classes.actionHeading}>Ресторан</h2>
          <div className={classes.actionBox}>
            <div
              onClick={goHomeforNow}
              className={`${classes.wholeAction} ${classes.first}`}
            >
              <div className={classes.iconTextArea}>
                <img
                  alt="icon"
                  src={mangeIcon}
                  className={classes.actionIcon}
                />

                <span className={classes.actionText}>Менеджмент</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={order} className={classes.actionIcon} />

                <span className={classes.actionText}>Заказы</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={user} className={classes.actionIcon} />

                <span className={classes.actionText}>Сотрудники</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={menu} className={classes.actionIcon} />

                <span className={classes.actionText}>Меню</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={clinets} className={classes.actionIcon} />

                <span className={classes.actionText}>Клиенты</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={review} className={classes.actionIcon} />

                <span className={classes.actionText}>Отчеты</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={delivery} className={classes.actionIcon} />

                <span className={classes.actionText}>Доставка</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>

            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={Settings} className={classes.actionIcon} />

                <span className={classes.actionText}>Настройки</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>
          </div>
          <h2 className={classes.actionHeading}>Аккаунт</h2>
          <div className={classes.actionBox}>
            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={tarrif} className={classes.actionIcon} />

                <span className={classes.actionText}>Тарифы</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>
            <div className={classes.wholeAction}>
              <div className={classes.iconTextArea}>
                <img alt="icon" src={statica} className={classes.actionIcon} />

                <span className={classes.actionText}>Статистика</span>
              </div>
              <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideNavigation;
