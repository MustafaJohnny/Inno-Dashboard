import React from "react";
import axios from "axios";
import classes from "./LoginPage.module.css";
import LoginImg from "../Images/LoginImg.png";
import Logo from "../Icons/Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const getEmail = (event) => {
    dispatch(controlActions.getUserEmail(event.target.value));
  };

  const getPassword = (event) => {
    dispatch(controlActions.getUserPassword(event.target.value));
  };

  const checkUserLogin = (event) => {
    event.preventDefault();

    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    if (!regex.test(userEmail)) return;

    if (userEmail.trim() === "") return;

    if (userPassword.trim() === "") return;

    if (regex.test(userEmail) && userPassword) {
      let mounted = true;

      const getData = async () => {
        const data = {
          username: userEmail,
          password: userPassword,
        };

        const request = await axios.post(
          `http://innomenu.ru:8000/api/v1/user/login`,
          {},

          {
            auth: {
              username: userEmail,
              password: userPassword,
            },
          }
        );

        if (mounted) {
          dispatch(controlActions.getUserDataFromServer(request.data));
        }
      };

      getData();
    }
  };

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
              <form
                onSubmit={checkUserLogin}
                className={classes.mainFormInputs}
              >
                <div className={classes.wholeInput}>
                  <label className={classes.inputsLable} htmlFor="email">
                    Электронная почта
                  </label>
                  <input
                    onChange={getEmail}
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
                    onChange={getPassword}
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
                <button type="submit" className={classes.loginBtn}>
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
