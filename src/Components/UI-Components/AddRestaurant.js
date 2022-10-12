import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch } from "react-redux";

const AddRestaurant = () => {
  const dispatch = useDispatch();

  const hideAddRestaurent = () => {
    dispatch(controlActions.toggleAddRestaurant());
  };

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

              <select id="lang" className={classes.modalBasicInput}>
                <option value=""></option>
                <option value="friends">русский</option>
                <option value="youtube">английский</option>
                <option value="podcast">испанский</option>
              </select>
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
          <div className={classes.modalInputsContaine2}>
            <div className={classes.twoInputsArea}>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable} htmlFor="start">
                  Начало работы
                </label>
                <input
                  type="time"
                  className={classes.modalBasicInput}
                  id="start"
                />
              </div>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable} htmlFor="end">
                  Конец работы
                </label>
                <input
                  type="time"
                  className={classes.modalBasicInput}
                  id="end"
                />
              </div>
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="zone">
                Временная зона
              </label>

              <select
                id="zone"
                className={`${classes.modalBasicInput} ${classes.zoneInput}`}
              >
                <option value=""></option>
                <option value="friends">Москва</option>
                <option value="youtube">Минск</option>
                <option value="podcast">Буэнос айрес</option>
              </select>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button className={classes.controlBtn}>ДОБАВИТЬ</button>
          <button
            onClick={hideAddRestaurent}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddRestaurent} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddRestaurant;
