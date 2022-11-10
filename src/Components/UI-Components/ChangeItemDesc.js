import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ChangeItemDesc = () => {
  const [ItemDesc, setItemDesc] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemID = useSelector((state) => state.controler.item_current_ID);
  const itemOldDesc = useSelector((state) => state.controler.item_desc_value);

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideChangeItemDesc = () => {
    dispatch(controlActions.toggleChangeItemDesc());
  };

  const addNewItemDesc = () => {
    axios
      .patch(
        `http://${serverAPI}/api/prod/product_desc_change/${userLanguage}/${ItemDesc}/${itemID}`,
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
          hideChangeItemDesc();
          navigate(0);
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Изменить описание</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Новое Описание
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
          <button onClick={addNewItemDesc} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeItemDesc}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
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
