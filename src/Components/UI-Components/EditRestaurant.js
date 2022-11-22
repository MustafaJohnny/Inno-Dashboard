import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditRestaurant = () => {
  const [restImage, setRestImage] = useState([]);
  const [restName, setRestName] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restStartTime, setRestStartTime] = useState("");
  const [restEndTime, setRestEndTime] = useState("");
  const [restTimeZone, setRestTimeZone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${userDomain}`;

  const editedRestID = useSelector(
    (state) => state.controler.restaurant_edit_id
  );

  const restOldData = useSelector(
    (state) => state.controler.restaurant_old_data
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

  let formIsValid = false;
  let imageIsValid = false;

  if (
    restImage.size ||
    restName ||
    restAddress ||
    restPhone ||
    restStartTime ||
    restEndTime ||
    restTimeZone
  ) {
    formIsValid = true;
  }

  if (restImage.size >= 1000000) {
    formIsValid = false;
  }

  if (restImage.size <= 1000000) {
    imageIsValid = true;
  }

  const hideEditRestaurent = () => {
    dispatch(controlActions.toggleEditRestaurant());
  };

  const EditRestaurant = () => {
    hideEditRestaurent();
    dispatch(controlActions.toggleSpinnerHome());

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
    if (!serverParams.timezone) delete serverParams.timezone;
    if (!serverParams.name_rest) delete serverParams.name_rest;
    if (!serverParams.addr_rest) delete serverParams.addr_rest;
    if (!serverParams.tel_rest) delete serverParams.tel_rest;

    let newData = JSON.stringify(serverParams);

    const formData = new FormData();

    if (restImage.size) {
      formData.append("in_file", restImage, restImage.name);
    }

    if (serverParams) {
      formData.append("base", newData);
    }

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/rest/restDataChange/${editedRestID}/${userLanguage}`,
        formData,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.getUserDataAfterLogin(response.data));
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
        <h1 className={classes.modalHeading}>{t("editRest")}</h1>
        <form className={classes.modalForm}>
          <div
            className={classes.inputImgArea2}
            style={{
              backgroundImage: `url("${URL}/${restOldData.image}")`,
            }}
          >
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
            </div>
            {!imageIsValid && (
              <span className={classes.requiredImgMess2}>{t("imgLimit")}</span>
            )}
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("justName")}
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setRestName(event.target.value)}
                placeholder={restOldData.name_rest}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="phone">
                {t("justPhone")}
              </label>
              <input
                onChange={(event) => setRestPhone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="phone"
                placeholder={restOldData.tel_rest}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="address">
                {t("justAddress")}
              </label>
              <input
                onChange={(event) => setRestAddress(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
                placeholder={restOldData.addr_rest}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="zone">
                {t("timeZone")}
              </label>

              <input
                onChange={(event) => setRestTimeZone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
                placeholder={restOldData.timezone}
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
                  placeholder={
                    !restOldData.time_start ? "" : restOldData.time_start
                  }
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
                  placeholder={
                    !restOldData.time_end ? "" : restOldData.time_start
                  }
                />
              </div>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={EditRestaurant}
            className={classes.controlBtn}
          >
            {t("saveBtn")}
          </button>
          <button
            onClick={hideEditRestaurent}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideEditRestaurent} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditRestaurant;
