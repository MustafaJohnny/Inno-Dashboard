import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch } from "react-redux";

const AddService = () => {
  const dispatch = useDispatch();

  const hideAddService = () => {
    dispatch(controlActions.toggleAddService());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить сервис</h1>
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
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Название
              </label>
              <input
                type="text"
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService}`}
                id="name"
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button className={classes.controlBtn}>ДОБАВИТЬ</button>
          <button
            onClick={hideAddService}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddService} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddService;
