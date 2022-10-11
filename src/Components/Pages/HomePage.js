import React from "react";
import AddRestaurant from "../UI-Components/AddRestaurant";
import classes from "./HomePage.module.css";
import arrowR from "../Icons/arrowR.svg";
import mangeIcon from "../Icons/mange.svg";
import clinets from "../Icons/clinets.svg";
import delivery from "../Icons/delivery.svg";
import menu from "../Icons/menu.svg";
import order from "../Icons/order.svg";
import review from "../Icons/review.svg";
import Settings from "../Icons/Settings.svg";
import statica from "../Icons/static.svg";
import axios from "axios";
import tarrif from "../Icons/tarrif.svg";
import user from "../Icons/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { controlActions } from "../Redux/ReduxStore";

const HomePage = () => {
  const [waitLogo, setWaitLogo] = useState(false);
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userName = useSelector((state) => state.controler.user_name);
  const userRole = useSelector((state) => state.controler.user_role);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userLogo = useSelector((state) => state.controler.user_logo);
  const userLogoText = useSelector((state) => state.controler.user_logo_text);
  const userServices = useSelector((state) => state.controler.user_services);
  const userRestaurants = useSelector(
    (state) => state.controler.user_restaurants
  );

  // useEffect(() => {
  //   let mounted = true;

  //   const getData = async () => {
  //     const request = await axios.get(
  //       `http://${serverAPI}:8000/dash/restandservice_list?lang=RU`,
  //       {},

  //       {
  //         "Content-Type": "application/json",
  //         auth: {
  //           username: userEmail,
  //           password: userPassword,
  //         },
  //       }
  //     );

  //     if (mounted) {
  //       dispatch(controlActions.getUserDataAfterLogin(request.data));

  //       setTimeout(() => {
  //         setWaitLogo(true);
  //       }, 500);
  //     }
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    axios
      .get(
        `http://${serverAPI}:8000/dash/restandservice_list?lang=RU`,
        {},

        {
          "Content-Type": "application/json",
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        dispatch(controlActions.getUserDataAfterLogin(response.data));

        setTimeout(() => {
          setWaitLogo(true);
        }, 500);
      });
  }, []);

  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${userDomain}`;

  return (
    <React.Fragment>
      <section>
        <AddRestaurant />
        <main className={classes.mainContiner}>
          <div className={classes.sideNavBox}>
            <div className={classes.logoArea}>
              {waitLogo && (
                <div
                  className={classes.logoImg}
                  style={{
                    backgroundImage: `url("${URL}/${userLogo}")`,
                  }}
                ></div>
              )}

              <p className={classes.logoText}>{userLogoText}</p>
            </div>

            <div className={classes.actionArea}>
              <h2 className={classes.actionHeading}>Ресторан</h2>
              <div className={classes.actionBox}>
                <div className={classes.wholeAction}>
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
                    <img
                      alt="icon"
                      src={order}
                      className={classes.actionIcon}
                    />

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
                    <img
                      alt="icon"
                      src={clinets}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Клиенты</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>

                <div className={classes.wholeAction}>
                  <div className={classes.iconTextArea}>
                    <img
                      alt="icon"
                      src={review}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Отчеты</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>

                <div className={classes.wholeAction}>
                  <div className={classes.iconTextArea}>
                    <img
                      alt="icon"
                      src={delivery}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Доставка</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>

                <div className={classes.wholeAction}>
                  <div className={classes.iconTextArea}>
                    <img
                      alt="icon"
                      src={Settings}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Настройки</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>
              </div>
              <h2 className={classes.actionHeading}>Аккаунт</h2>
              <div className={classes.actionBox}>
                <div className={classes.wholeAction}>
                  <div className={classes.iconTextArea}>
                    <img
                      alt="icon"
                      src={tarrif}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Тарифы</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>
                <div className={classes.wholeAction}>
                  <div className={classes.iconTextArea}>
                    <img
                      alt="icon"
                      src={statica}
                      className={classes.actionIcon}
                    />

                    <span className={classes.actionText}>Статистика</span>
                  </div>
                  <img alt="arrow" src={arrowR} className={classes.arrowSVG} />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentBigBox}>
            <header className={classes.upHeader}>
              <h2 className={classes.headerHeading}>Менеджмент</h2>
              <div className={classes.nameRoleArea}>
                <span className={classes.userName}>{userName}</span>
                <span className={classes.userRole}>{userRole}</span>
              </div>
            </header>
            <main className={classes.changeContentBox}>
              <div className={classes.managmentContent}>
                <div className={classes.managementBtnsArea}>
                  <h1 className={classes.managementHeading}>РЕСТОРАНЫ</h1>
                  <div className={classes.twoBtnsManage}>
                    <button className={classes.manageBtn} type="button">
                      + Добавить сервис
                    </button>
                    <button className={classes.manageBtn} type="button">
                      + Добавить ресторан
                    </button>
                  </div>
                </div>

                <div className={classes.managementRestaurents}>
                  {userRestaurants.map((ele, index) => (
                    <div
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
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
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
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

export default HomePage;
