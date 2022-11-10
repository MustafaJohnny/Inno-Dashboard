import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeClientLogo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoImg, setLogoImg] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const hideChangeClientLogo = () => {
    dispatch(controlActions.toggleChangeClientLogo());
  };

  const addNewItemName = () => {
    const formData = new FormData();

    formData.append("in_file", logoImg, logoImg.name);

    axios
      .patch(`http://${serverAPI}/api/own/logoClientChange`, formData, {
        params: {},
        auth: {
          username: userEmail,
          password: userPassword,
        },
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        // if ((response.status = "200")) {
        // //   navigate(0);
        // }
        console.log(response);
        hideChangeClientLogo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Изменить Логотип</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setLogoImg(event.target.files[0])}
              required
            />
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={addNewItemName} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeClientLogo}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button
          onClick={hideChangeClientLogo}
          className={classes.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeClientLogo;
