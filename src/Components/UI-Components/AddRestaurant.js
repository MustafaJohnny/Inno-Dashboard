import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { useTranslation } from "react-i18next";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AddRestaurant = () => {
  const [restImage, setRestImage] = useState([]);
  const [restName, setRestName] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restStartTime, setRestStartTime] = useState("");
  const [restEndTime, setRestEndTime] = useState("");
  const [restTimeZone, setRestTimeZone] = useState("");
  
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (restImage.size && restName && restAddress && restPhone && restTimeZone) {
    formIsValid = true;
  }

  if (restImage.size >= 1000000 || !restImage) {
    formIsValid = false;
  }

  const hideAddRestaurent = () => {
    dispatch(controlActions.toggleAddRestaurant());
  };

  const createNewRestaurant = () => {
    hideAddRestaurent();
    dispatch(controlActions.toggleSpinnerHome());

    if (!formIsValid) {
      return;
    }

    const serverParams = {
      name_rest: restName,
      addr_rest: restAddress,
      tel_rest: restPhone,
      time_start: restStartTime,
      time_end: restEndTime,
      timezone: restTimeZone,
    };

    if (!serverParams.time_start) delete serverParams.time_start;
    if (!serverParams.time_end) delete serverParams.time_end;

    const formData = new FormData();

    formData.append("in_file", restImage, restImage.name);

    axios
      .post(`${process.env.REACT_APP_URL}/api/rest/rest_new/${userLanguage}`, formData, {
        params: serverParams,
        auth: {
          username: userEmail,
          password: userPassword,
        },
      })
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerHome());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerHome());
          dispatch(controlActions.toggleFallHome());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>{t("addRest")}</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <label className={classes.btnAddImgModal} htmlFor="fileImg">
                <img className={classes.uploadIcon} alt="icon" src={Upload} />
                <span className={classes.textBtnUpload}>{t("addPhoto")}</span>
              </label>
              <input
                className={classes.inputImgModal}
                type="file"
                id="fileImg"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setRestImage(event.target.files[0])}
                required
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && t("imgLimit")}
            </span>
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  {t("justName")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setRestName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="phone">
                  {t("justPhone")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) => setRestPhone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="phone"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="address">
                  {t("justAddress")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) => setRestAddress(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="zone">
                  {t("timeZone")}
                </label>
                <span className={classes.required}>*</span>
              </div>

              <input
                onChange={(event) => setRestTimeZone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
          </div>
          <div className={classes.modalInputsContaine2}>
            <div className={classes.twoInputsArea}>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable2} htmlFor="start">
                  {t("workStart")}
                </label>
                <input
                  onChange={(event) => setRestStartTime(event.target.value)}
                  type="time"
                  className={classes.modalBasicInput}
                  id="start"
                />
              </div>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable2} htmlFor="end">
                  {t("workEnd")}
                </label>
                <input
                  onChange={(event) => setRestEndTime(event.target.value)}
                  type="time"
                  className={classes.modalBasicInput}
                  id="end"
                />
              </div>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={createNewRestaurant}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideAddRestaurent}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideAddRestaurent} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddRestaurant;
