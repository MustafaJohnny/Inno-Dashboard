import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmDesign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const selectedDesignNum = useSelector(
    (state) => state.controler.selected_design_num
  );

  const hideConfirmDesign = () => {
    dispatch(controlActions.toggleConfirmDesign());
  };

  const changeDesignNumber = () => {
    axios
      .post(
        `http://${serverAPI}/api/v1/owner/design/${selectedDesignNum}`,
        "",
        {
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
        console.log(response);
        if ((response.status = "200")) {
          hideConfirmDesign();
          navigate(0);
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Выбрать дизайн меню</h1>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.confirmDesignHeading}>
              Вы действительно хотите выбрать этот дизайн меню?
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={changeDesignNumber} className={classes.controlBtn}>
            Да
          </button>
          <button
            onClick={hideConfirmDesign}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideConfirmDesign} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ConfirmDesign;
