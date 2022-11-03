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
  const [tablesLanguages, setTablesLanguage] = useState("");
  const appLanguages = useSelector((state) => state.controler.app_languages);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddTables = () => {
    dispatch(controlActions.toggleAddTables());
  };

  const AddNewTables = () => {
    // dispatch(controlActions.toggleSpinner());

    axios
      .post(
        `http://${serverAPI}/api/v1/table/table_new/${tablesLanguages}`,
        "",
        {
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
        }
      )
      .then((response) => {
        // setTimeout(() => {}, 4000);
        if (response.status === 200) {
          // dispatch(controlActions.toggleSpinner());
          hideAddTables();
          navigate(0);
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
              <label className={classes.modalBasicLable} htmlFor="name">
                Количество столы
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService}`}
                onChange={(event) => setNumberOfTables(event.target.value)}
                type="text"
                id="name"
                required
              />
            </div>

            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setTablesLanguage(event.target.value)}
                id="lang"
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                {appLanguages.map((element, index) => (
                  <option key={index} value={element[0]}>
                    {" "}
                    {element[1]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={AddNewTables} className={classes.controlBtn}>
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
