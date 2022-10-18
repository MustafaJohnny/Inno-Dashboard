import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import PenIcon from "../Icons/Pen.svg";
import imgQR from "../Images/QR.png";
import eyeIcon from "../Icons/eyeIcon.svg";
import downlodIcon from "../Icons/downlodIcon.svg";
import QRbtnIcon from "../Icons/QRbtn.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import classes from "./SettingsQRPages.module.css";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { controlActions } from "../Redux/ReduxStore";

const QRcodesPage = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const serverAPI = useSelector((state) => state.controler.serverAPI);
  //   const userDomain = useSelector((state) => state.controler.user_domain);
  //   const userEmail = useSelector((state) => state.controler.user_email);
  //   const userPassword = useSelector((state) => state.controler.user_password);

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };
  return (
    <React.Fragment>
      <section>
        <SideNavigation />
        <UpNavigation />
        <main className={classes.mainContiner}>
          <div className={classes.headingBtnArea}>
            <div className={classes.headingBackArea}>
              <img
                onClick={goPageBack}
                src={ArrowBack}
                alt="icon"
                className={classes.arrowBack}
              />
              <h1 className={classes.settingsHeading}>QR коды</h1>
            </div>
            <button type="button" className={classes.addTableBtn}>
              <img src={QRbtnIcon} alt="btn" className={classes.qrBtnIcon} />
              Добавить столы
            </button>
          </div>

          <div className={classes.qrBigBox}>
            <div className={classes.wholeQR}>
              <div className={classes.tableDescrioArea}>
                <span className={classes.tableDescription}>
                  Описание стола описание стола описание стола описание стола
                  описание стола описание стола описание стола
                  <button className={classes.editDescripBtn}>
                    <img src={PenIcon} alt="icon" className={classes.penIcon} />
                  </button>
                </span>
              </div>
              <div className={classes.optionsQRArea}>
                <div className={classes.optionsBox}>
                  <div className={classes.wholeOption}>
                    <span className={classes.optionText}>Заказ от стола</span>
                    <button className={classes.activeMenu} type="button">
                      Активный
                    </button>
                  </div>
                  <div className={classes.wholeOption}>
                    <span className={classes.optionText}>Вызов официанта</span>
                    <button className={classes.activeMenu} type="button">
                      Активный
                    </button>
                  </div>
                  <div className={classes.wholeOption}>
                    <span className={classes.optionText}>Активный стол</span>
                    <button className={classes.activeMenu} type="button">
                      Активный
                    </button>
                  </div>
                </div>
                <div className={classes.justAreaQR}>
                  <img src={imgQR} alt="QR-code" className={classes.imgQR} />
                  <div className={classes.actionQRArea}>
                    <img
                      src={eyeIcon}
                      alt="icon"
                      className={classes.actionQRicons}
                    />
                    <img
                      src={downlodIcon}
                      alt="icon"
                      className={classes.actionQRicons}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.wholeQR}></div>
            <div className={classes.wholeQR}></div>
            <div className={classes.wholeQR}></div>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(QRcodesPage);
