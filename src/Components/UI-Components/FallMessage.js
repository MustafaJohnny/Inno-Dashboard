import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FallMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hideFallModal = () => {
    dispatch(controlActions.toggleFallHome());
    navigate("/home");
  };

  return (
    <React.Fragment>
      <Overlay />
      <div
        className={`${classes.modal} ${classes.modalDesign} ${classes.modalFall}`}
      >
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.fallMessageHeading}>
              Что-то пошло не так. Пожалуйста, попробуйте повторить операцию
              через 15 минут
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtttnsArea}>
          <button
            onClick={hideFallModal}
            className={`${classes.controlBtn} ${classes.fallBtn}`}
          >
            Продолжить
          </button>
        </div>
        {/* <button className={classes.btnCloseModal}>&times;</button> */}
      </div>
    </React.Fragment>
  );
};

export default FallMessage;
