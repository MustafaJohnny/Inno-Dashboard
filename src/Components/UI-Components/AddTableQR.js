import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AddTableQR = () => {
  const [tableQRdescription, setTableQRdescription] = useState("");
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const clickedTableIdQR = useSelector((state) => state.controler.user_QR_ID);

  const clickedTableDescripValue = useSelector(
    (state) => state.controler.user_table_QR_descrip_value
  );

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

  if (tableQRdescription) {
    formIsValid = true;
  }

  const hideAddTableQR = () => {
    dispatch(controlActions.toggleAddTableQR());
  };

  const createNewTableQR = () => {
    hideAddTableQR();
    dispatch(controlActions.toggleSpinnerQR());

    axios
      .post(`${process.env.REACT_APP_URL}/api/v1/table/table_description`, "", {
        params: {
          description: tableQRdescription,
          id: clickedTableIdQR,
        },
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
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerQR());
            navigate(0);
          }
        }, 2000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerQR());
          dispatch(controlActions.toggleFallQR());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>{t("changeDescrip")}</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("justDescrip")}
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setTableQRdescription(event.target.value)}
                placeholder={clickedTableDescripValue}
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
            onClick={createNewTableQR}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideAddTableQR}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideAddTableQR} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTableQR;
