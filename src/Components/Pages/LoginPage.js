import React from "react";
import axios from "axios";
import classes from "./LoginPage.module.css";
import LoginImg from "../Images/LoginImg.png";
import Logo from "../Icons/Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const LoginPage = () => {
  const dispatch = useDispatch();
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
      
      const getData = async function() {
        try {
          const request = await axios.post(
            `${process.env.REACT_APP_URL}/api/v1/user/login`,
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
            dispatch(controlActions.getAuthUser(true));
          }
        }
        
        catch (e){
          dispatch(controlActions.getIsAuthUser(false));
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
          <p className={classes.logoText}>TACTIC MENU</p>
        </div>
        <main className={classes.loginBox}>
          <div className={classes.loginActionsArea}>
            <div className={classes.actionBox}>
              <h1 className={classes.loginSmailHeading}>LOGIN</h1>
              <form
                onSubmit={checkUserLogin}
                className={classes.mainFormInputs}
              >
                <div className={classes.wholeInput}>
                  <label className={classes.inputsLable} htmlFor="email">
                    Email
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
                    Password
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
                      Remember Me
                    </label>
                  </div>
                  <a
                    href="dashboard/src/Components/Pages/LoginPage#"
                    className={classes.forgetPassLink}
                  >
                    Forget Password?
                  </a>
                </div>
                <button type="submit" className={classes.loginBtn}>
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className={classes.loginHeadingImgArea}>
            <h1 className={classes.loginHeading}>Your Smart Menu</h1>
            <div className={classes.loginTextArea}>
              <p className={classes.loginText}>
                Fast to learn and easy to use Tactic menu platform
              </p>
              <p className={classes.loginText}>for your establishment</p>
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
