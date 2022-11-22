import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FallMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const hideFallModal = () => {
    dispatch(controlActions.toggleFallHome());
    navigate("/home");
  };

  return (
    <React.Fragment>
      <Overlay />
      <div
        className={`${classes.modal} ${classes.modalDesign} ${classes.modalFall}`}
      >
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.fallMessageHeading}>{t("fallMessage")}</h1>
          </div>
        </form>
        <div className={classes.modalControlBtttnsArea}>
          <button
            onClick={hideFallModal}
            className={`${classes.controlBtn} ${classes.fallBtn}`}
          >
            {t("justContinuo")}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FallMessage;
