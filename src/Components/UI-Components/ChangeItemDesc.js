import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ChangeItemName = () => {
  const [ItemName, setItemName] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemID = useSelector((state) => state.controler.item_current_ID);
  const itemOldName = useSelector((state) => state.controler.item_name_value);

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();

  const hideChangeItemName = () => {
    dispatch(controlActions.toggleChangeItemName());
  };

  const addNewItemName = () => {
    axios
      .patch(
        `http://${serverAPI}/api/v1/menu/product_name_change/${userLanguage}/{name}/${itemID}`,
        "",
        {
          params: {
            name: ItemName,
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
          hideChangeItemName();
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
