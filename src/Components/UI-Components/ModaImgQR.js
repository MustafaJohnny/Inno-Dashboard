import React from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";

const ModalImgQR = () => {
  const serverAPI = useSelector((state) => state.controler.serverAPI);

  const userDomain = useSelector((state) => state.controler.user_domain);

  const ImgQR = useSelector((state) => state.controler.user_QR_big_img);

  const URL = `http://${serverAPI}/api/v1/table/qr/${userDomain}`;

  const dispatch = useDispatch();

  const hideModalQR = () => {
    dispatch(controlActions.toggleModalImgQR());
  };

  return (
    <React.Fragment>
      <Overlay />
      <div
        style={{
          backgroundImage: `url("${URL}/${ImgQR}")`,
        }}
        className={classes.modalQR}
      >
        <button
          onClick={hideModalQR}
          className={`${classes.btnCloseModal} ${classes.btnCloseModalQR}`}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default ModalImgQR;
