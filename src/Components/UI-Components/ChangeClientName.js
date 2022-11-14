import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ChangeClientName = () => {
  const [clientName, setClientName] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const clientOldName = useSelector((state) => state.controler.user_logo_text);

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

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
        `http://${serverAPI}/api/own/nameClientChange/${userLanguage}`,
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
        <h1 className={classes.modalHeading}>Название заведения</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  Новое название
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
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeClinet}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
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
