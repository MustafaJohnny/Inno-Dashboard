import React from "react";
import classes from "./LoginPage.module.css";
import LoginImg from "../Images/LoginImg.png";
import Logo from "../Icons/Logo.svg";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { controlActions } from "../Redux/ReduxStore";
// import axios from "axios";

const LoginPage = () => {
  return (
    <React.Fragment>
      <section>
        <div className={classes.logoArea}>
          <img alt="logo" className={classes.logoImg} src={Logo} />
          <p className={classes.logoText}>INNO MENU</p>
        </div>
        <main className={classes.loginBox}>
          <div className={classes.loginActionsArea}>
            <div className={classes.actionBox}>
              <h1 className={classes.loginSmailHeading}>Войти</h1>
              <form className={classes.mainFormInputs}>
                <div className={classes.wholeInput}>
                  <label className={classes.inputsLable} htmlFor="email">
                    Электронная почта
                  </label>
                  <input
                    className={classes.mainInput}
                    id="email"
                    type="email"
                  />
                </div>
                <div className={classes.wholeInput}>
                  <label className={classes.inputsLable} htmlFor="password">
                    Пароль
                  </label>
                  <input
                    className={classes.mainInput}
                    id="password"
                    type="password"
                  />
                </div>

                <div className={classes.forgotBox}>
                  <div className={classes.rememberArea}>
                    <input
                      id="remember"
                      type="checkbox"
                      className={classes.loginCheckboxInput}
                    />
                    <label
                      className={classes.checkPassLable}
                      htmlFor="remember"
                    >
                      Запомнить меня
                    </label>
                  </div>
                  <a href="#" className={classes.forgetPassLink}>
                    Забыли пароль?
                  </a>
                </div>
                <button className={classes.loginBtn} type="button">
                  Войти
                </button>
              </form>
            </div>
          </div>
          <div className={classes.loginHeadingImgArea}>
            <h1 className={classes.loginHeading}>Ваше смарт меню</h1>
            <div className={classes.loginTextArea}>
              <p className={classes.loginText}>
                Быстрая в освоении и простая в использовании платформа Tactic
                menu
              </p>
              <p className={classes.loginText}>для вашего заведения</p>
            </div>

            <div className={classes.loginImgBox}>
              <img alt="phone" className={classes.loginImage} src={LoginImg} />
            </div>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default LoginPage;
