import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeItemName = () => {
  const [ItemName, setItemName] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemOldName = useSelector((state) => state.controler.item_name_value);
  const currentItemID = useSelector((state) => state.controler.item_current_ID);

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideChangeItemName = () => {
    dispatch(controlActions.toggleChangeItemName());
  };

  const addNewItemName = () => {
    axios
      .patch(
        `http://${serverAPI}/api/prod/product_name_change/${userLanguage}/${ItemName}/${currentItemID}`,
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
        if ((response.status = "200")) {
          hideChangeItemName();
          navigate(0);
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Изменить название</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Новое название
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setItemName(event.target.value)}
                placeholder={itemOldName}
                type="text"
                id="name"
                required
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={addNewItemName} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeItemName}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideChangeItemName} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeItemName;
