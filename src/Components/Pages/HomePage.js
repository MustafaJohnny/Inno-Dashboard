import React from "react";
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
import tarrif from "../Icons/tarrif.svg";
import user from "../Icons/user.svg";
import LogoDash from "../Icons/LogoDashborad.svg";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const HomePage = () => {
  const userName = useSelector((state) => state.controler.user_name);
  const userRole = useSelector((state) => state.controler.user_role);

  return (
    <React.Fragment>
      <section>
        <main className={classes.mainContiner}>
          <div className={classes.sideNavBox}>
            <div className={classes.logoArea}>
              <img className={classes.logoDash} alt="icon" src={LogoDash} />
              <p className={classes.logoText}>ЯМБУРГ</p>
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
                  <div className={classes.itemRestaurent}></div>
                  <div className={classes.itemRestaurent}></div>
                  <div className={classes.itemRestaurent}></div>
                </div>

                <div className={classes.serviceHeadingArea}>
                  <h1 className={classes.managementHeading}>СЕРВИСЫ</h1>
                </div>

                <div className={classes.managementRestaurents}>
                  <div className={classes.itemRestaurent}></div>
                  <div className={classes.itemRestaurent}></div>
                  <div className={classes.itemRestaurent}></div>
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
