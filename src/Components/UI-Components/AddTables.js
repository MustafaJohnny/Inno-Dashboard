import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddTables = () => {
  const [numberOfTables, setNumberOfTables] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let formIsValid = false;

  if (numberOfTables) {
    formIsValid = true;
  }

  const hideAddTables = () => {
    dispatch(controlActions.toggleAddTables());
  };

  const AddNewTables = () => {
    dispatch(controlActions.toggleSpinnerQR());
    hideAddTables();

    if (!formIsValid) {
      return;
    }

    axios
      .post(`http://${serverAPI}/api/v1/table/table_new/${userLanguage}`, "", {
        params: {
          table_pcs: numberOfTables,
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
        }, 3000);
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
        <h1 className={classes.modalHeading}>Добавить столы</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  Количество столы
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService}`}
                onChange={(event) => setNumberOfTables(event.target.value)}
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
            onClick={AddNewTables}
            className={classes.controlBtn}
          >
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddTables}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddTables} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTables;
