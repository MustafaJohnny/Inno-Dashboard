import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChangeItemPrice = () => {
  const [ItemPrice, setItemPrice] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemOldPrice = useSelector((state) => state.controler.item_price_value);
  const currentItemID = useSelector((state) => state.controler.item_current_ID);

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
        <h1 className={classes.modalHeading}>
          {t("justChange")} {t("justPrice")}
        </h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("new2")} {t("justPrice")}
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
            {t("addBtn")}
          </button>
          <button
            onClick={hideChangeItemPrice}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
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
