import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChangeItemDesc = () => {
  const [ItemDesc, setItemDesc] = useState("");
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemID = useSelector((state) => state.controler.item_current_ID);
  const itemOldDesc = useSelector((state) => state.controler.item_desc_value);

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
  const navigate = useNavigate();

  let formIsVaild = false;

  if (ItemDesc) {
    formIsVaild = true;
  }

  const hideChangeItemDesc = () => {
    dispatch(controlActions.toggleChangeItemDesc());
  };

  const addNewItemDesc = () => {
    hideChangeItemDesc();
    dispatch(controlActions.toggleSpinnerCurrentItem());

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/prod/product_desc_change/${userLanguage}/${ItemDesc}/${itemID}`,
        "",
        {
          params: {},
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
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerCurrentItem());
            navigate(0);
          }
        }, 2000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerCurrentItem());
          dispatch(controlActions.toggleFallCurrentItem());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>
          {t("justChange")} {t("justDescrip")}
        </h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("new")} {t("justDescrip")}
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setItemDesc(event.target.value)}
                placeholder={itemOldDesc}
                type="text"
                id="name"
                required
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsVaild}
            onClick={addNewItemDesc}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideChangeItemDesc}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideChangeItemDesc} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeItemDesc;
