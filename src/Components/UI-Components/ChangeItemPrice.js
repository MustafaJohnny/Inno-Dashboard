import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeItemPrice = () => {
  const [ItemPrice, setItemPrice] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemOldPrice = useSelector((state) => state.controler.item_price_value);
  const currentItemID = useSelector((state) => state.controler.item_current_ID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let formIsVaild = false;

  if (ItemPrice) {
    formIsVaild = true;
  }

  const hideChangeItemPrice = () => {
    dispatch(controlActions.toggleChangeItemPrice());
  };

  const addNewItemName = () => {
    hideChangeItemPrice();
    dispatch(controlActions.toggleSpinnerCurrentItem());

    axios
      .patch(
        `http://${serverAPI}/api/prod/product_price_change/${currentItemID}`,
        "",
        {
          params: {
            price: ItemPrice,
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
        <h1 className={classes.modalHeading}>Изменить цену</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                новая цена
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setItemPrice(+event.target.value)}
                placeholder={itemOldPrice}
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
            onClick={addNewItemName}
            className={classes.controlBtn}
          >
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeItemPrice}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideChangeItemPrice} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeItemPrice;
