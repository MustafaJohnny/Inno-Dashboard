import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
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

  let formIsValid = false;

  if (logoImg.size) {
    formIsValid = true;
  }

  if (logoImg.size >= 1000000 || !logoImg) {
    formIsValid = false;
  }

  const addNewItemName = () => {
    if (!formIsValid) {
      return;
    }

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
        if ((response.status = "200")) {
          dispatch(controlActions.getUserDataAfterLogin(response.data));
          hideChangeClientLogo();
          navigate(0);
        }
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
          {/* <div className={classes.inputImgArea}>
            <label className={classes.btnAddImgModal} htmlFor="fileImg">
              <img className={classes.uploadIcon} alt="icon" src={Upload} />
              <span className={classes.textBtnUpload}>ДОБАВИТЬ ФОТО</span>
            </label>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setLogoImg(event.target.files[0])}
              required
            />
          </div> */}

          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <label className={classes.btnAddImgModal} htmlFor="fileImg">
                <img className={classes.uploadIcon} alt="icon" src={Upload} />
                <span className={classes.textBtnUpload}>ДОБАВИТЬ ФОТО</span>
              </label>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setLogoImg(event.target.files[0])}
                required
                id="fileImg"
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && "Размер изображения должен быть меньше 1 мб"}
            </span>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={addNewItemName}
            className={classes.controlBtn}
          >
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
