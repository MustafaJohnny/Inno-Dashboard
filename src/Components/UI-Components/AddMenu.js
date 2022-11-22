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

const AddMenu = () => {
  const [menuImage, setMenuImage] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");
  const [menuDescription, setMenudescription] = useState("");
  const [menuAllHours, setMenuAllHours] = useState("");
  
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userMenuID = useSelector((state) => state.controler.user_menu_ID);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

  let formIsValid = false;

  if (menuImage.size && menuName && menuAllHours) {
    formIsValid = true;
  }

  if (menuImage.size >= 1000000 || !menuImage) {
    formIsValid = false;
  }

  const hideAddMenu = () => {
    dispatch(controlActions.toggleAddMenu());
  };

  const createNewRestaurant = () => {
    dispatch(controlActions.toggleSpinnerMenu());
    hideAddMenu();

    const serverParams = {
      name: menuName,
      description: menuDescription,
      all_hours: menuAllHours,
      time_start: menuStartTime,
      time_end: menuEndTime,
      ids: userMenuID,
    };

    if (!serverParams.time_start) delete serverParams.time_start;
    if (!serverParams.time_end) delete serverParams.time_end;
    if (!serverParams.description) delete serverParams.description;

    const formData = new FormData();

    formData.append("in_file", menuImage, menuImage.name);

    axios
      .post(`${process.env.REACT_APP_URL}/api/menu/new/${userLanguage}`, formData, {
        params: serverParams,
        auth: {
          username: userEmail,
          password: userPassword,
        },
      })
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerMenu());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerMenu());
          dispatch(controlActions.toggleFallMenu());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>
          {t("addBtnSmall")} {t("justMenuSmall")}
        </h1>
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
                onChange={(event) => setMenuImage(event.target.files[0])}
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
                onChange={(event) => setMenuName(event.target.value)}
              />
            </div>

            <div
              className={`${classes.wholeModalInput} ${classes.wholeModalInputGap}`}
            >
              <label className={classes.modalBasicLable} htmlFor="address">
                {t("justDescrip")}
              </label>
              <input
                onChange={(event) => setMenudescription(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="lang">
                  {t("validLimt")}
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setMenuAllHours(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>{t("yes")}</option>
                <option value={false}>{t("no")}</option>
              </select>
            </div>
            <div className={classes.modalInputsContaine2}>
              <div className={classes.twoInputsArea}>
                <div className={classes.wholeModalInput}>
                  <label className={classes.modalBasicLable} htmlFor="start">
                    {t("workStart")}
                  </label>
                  <input
                    onChange={(event) => setMenuStartTime(event.target.value)}
                    type="time"
                    className={classes.modalBasicInput}
                    id="start"
                  />
                </div>
                <div className={classes.wholeModalInput}>
                  <label className={classes.modalBasicLable} htmlFor="end">
                    {t("workEnd")}
                  </label>
                  <input
                    onChange={(event) => setMenuEndTime(event.target.value)}
                    type="time"
                    className={classes.modalBasicInput}
                    id="end"
                  />
                </div>
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
            onClick={hideAddMenu}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideAddMenu} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddMenu;
