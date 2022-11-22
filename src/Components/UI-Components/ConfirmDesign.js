import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const selectedDesignNum = useSelector(
    (state) => state.controler.selected_design_num
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

  const hideConfirmDesign = () => {
    dispatch(controlActions.toggleConfirmDesign());
    navigate(0);
  };

  const changeDesignNumber = () => {
    axios
      .post(`http://${serverAPI}/api/own/design/${selectedDesignNum}`, "", {
        auth: {
          username: userEmail,
          password: userPassword,
        },
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if ((response.status = "200")) {
          dispatch(controlActions.getUserDataAfterLogin(response.data));
          hideConfirmDesign();
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modalDesign}`}>
        <h1 className={classes.modalHeading}>{t("choseDesigMenu")}</h1>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.confirmDesignHeading}>
              {t("choseDesignText")}
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={changeDesignNumber} className={classes.controlBtn}>
            {t("justChoose")}
          </button>
          <button
            onClick={hideConfirmDesign}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideConfirmDesign} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ConfirmDesign;
