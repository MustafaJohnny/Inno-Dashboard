import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const ChangeClientName = () => {
  const [clientName, setClientName] = useState("");
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const clientOldName = useSelector((state) => state.controler.user_logo_text);

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

  const dispatch = useDispatch();

  const hideChangeClinet = () => {
    dispatch(controlActions.toggleChangeClientName());
  };

  let formIsValid = false;

  if (clientName) {
    formIsValid = true;
  }

  const addNewClientName = () => {
    if (!formIsValid) {
      return;
    }

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/own/nameClientChange/${userLanguage}`,
        "",
        {
          params: {
            new_name: clientName,
          },
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if ((response.status = "200")) {
          dispatch(controlActions.getUserDataAfterLogin(response.data));
          hideChangeClinet();
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>{t("justName")}</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  {t("new")} {t("justName")}
                </label>

                <span className={classes.required}>*</span>
              </div>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setClientName(event.target.value)}
                placeholder={clientOldName}
                type="text"
                id="name"
                required
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={addNewClientName}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideChangeClinet}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideChangeClinet} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeClientName;
