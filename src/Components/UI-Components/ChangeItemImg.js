import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeItemImg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ItemImg, setItemImg] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const currentItemID = useSelector((state) => state.controler.item_current_ID);

  const hideChangeItemImg = () => {
    dispatch(controlActions.toggleChangeItemImg());
  };

  const addNewItemName = () => {
    const formData = new FormData();

    formData.append("in_file", ItemImg, ItemImg.name);

    axios
      .patch(
        `http://${serverAPI}/api/prod/product_image_change/${currentItemID}`,
        formData,
        {
          params: {},
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
          hideChangeItemImg();
          navigate(0);
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Изменить изображение</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <label className={classes.btnAddImgModal} htmlFor="fileImg">
              <img className={classes.uploadIcon} alt="icon" src={Upload} />
              <span className={classes.textBtnUpload}>ДОБАВИТЬ ФОТО</span>
            </label>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setItemImg(event.target.files[0])}
              required
              id="fileImg"
            />
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={addNewItemName} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideChangeItemImg}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideChangeItemImg} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChangeItemImg;
