import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch } from "react-redux";

const AddRestaurant = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить ресторан</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              required
            />
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Название
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="lang"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="address">
                Адрес
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="phone">
                Телефон
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="phone"
              />
            </div>
          </div>
        </form>
        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default AddRestaurant;
