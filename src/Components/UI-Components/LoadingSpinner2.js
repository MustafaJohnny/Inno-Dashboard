import classes from "./LoadingSpinner2.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";

const LoadingSpinner2 = () => {
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

  return (
    <React.Fragment>
      <div className={classes.spinnerBox}>
        <h3 className={classes.message}>{t("spinnerText")}</h3>
        <div className={classes["lds-default"]}>
          <div></div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner2;
