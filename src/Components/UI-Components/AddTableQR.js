import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddTableQR = () => {
  const [tableQRdescription, setTableQRdescription] = useState("");
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const clickedTableIdQR = useSelector((state) => state.controler.user_QR_ID);
  const clickedTableDescripValue = useSelector(
    (state) => state.controler.user_table_QR_descrip_value
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddTableQR = () => {
    dispatch(controlActions.toggleAddTableQR());
  };

  const createNewTableQR = () => {
    axios
      .post(`http://${serverAPI}/api/v1/table/table_description`, "", {
        params: {
          description: tableQRdescription,
          id: clickedTableIdQR,
        },
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
        if (response.status === 200) {
          hideAddTableQR();
          navigate(0);
        }
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleFallQR());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Изменить описание</h1>
        <form className={classes.modalForm}>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Описание
              </label>
              <input
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService} ${classes.modalQRinput}`}
                onChange={(event) => setTableQRdescription(event.target.value)}
                placeholder={clickedTableDescripValue}
                type="text"
                id="name"
                required
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={createNewTableQR} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddTableQR}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddTableQR} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTableQR;
