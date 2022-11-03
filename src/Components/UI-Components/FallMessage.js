import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FallMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modalDesign}`}>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.confirmDesignHeading}>
              Что-то пошло не так. Пожалуйста, попробуйте повторить орерацию
              через 15 минут
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtttnsArea}>
          <button className={classes.controlBtn}>Продолжить</button>
        </div>
        <button className={classes.btnCloseModal}>&times;</button>
      </div>
    </React.Fragment>
  );
};

export default FallMessage;
