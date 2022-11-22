import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangeClientLogo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoImg, setLogoImg] = useState("");
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const hideChangeClientLogo = () => {
    dispatch(controlActions.toggleChangeClientLogo());
  };

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

  let formIsValid = false;

  if (logoImg.size) {
    formIsValid = true;
  }

  if (logoImg.size >= 1000000 || !logoImg) {
    formIsValid = false;
  }

  const addNewItemName = () => {
    if (!formIsValid) {
      return;
    }

    const formData = new FormData();

    formData.append("in_file", logoImg, logoImg.name);

    axios
      .patch(`${process.env.REACT_APP_URL}/api/own/logoClientChange`, formData, {
        params: {},
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
          hideChangeClientLogo();
          navigate(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>
          {t("justChange")} {t("logo")}
        </h1>
        <form className={classes.modalForm}>
          {/* <div className={classes.inputImgArea}>
            <label className={classes.btnAddImgModal} htmlFor="fileImg">
              <img className={classes.uploadIcon} alt="icon" src={Upload} />
              <span className={classes.textBtnUpload}>ДОБАВИТЬ ФОТО</span>
            </label>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setLogoImg(event.target.files[0])}
              required
            />
          </div> */}

          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <label className={classes.btnAddImgModal} htmlFor="fileImg">
                <img className={classes.uploadIcon} alt="icon" src={Upload} />
                <span className={classes.textBtnUpload}>{t("addPhoto")}</span>
              </label>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setLogoImg(event.target.files[0])}
                required
                id="fileImg"
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && t("imgLimit")}
            </span>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={addNewItemName}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideChangeClientLogo}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button
          onClick={hideChangeClientLogo}
          className={classes.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeClientLogo;
