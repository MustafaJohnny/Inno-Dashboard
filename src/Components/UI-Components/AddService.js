import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceImage, setServiceImage] = useState([]);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddService = () => {
    dispatch(controlActions.toggleAddService());
  };

  let formIsValid = false;

  if (serviceImage.size && serviceName) {
    formIsValid = true;
  }

  if (serviceImage.size >= 1000000 || !serviceImage) {
    formIsValid = false;
  }

  const createNewService = () => {
    dispatch(controlActions.toggleSpinnerHome());
    hideAddService();

    if (!formIsValid) {
      return;
    }

    const serverParams = {
      name_service: serviceName,
    };

    const formData = new FormData();

    formData.append("in_file", serviceImage, serviceImage.name);

    axios
      .post(
        `http://${serverAPI}/api/serv/service_new/${userLanguage}`,
        formData,
        {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerHome());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerHome());
          dispatch(controlActions.toggleFallHome());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить сервис</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setServiceImage(event.target.files[0])}
                required
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && "Размер изображения должен быть меньше 1 мб"}
            </span>
          </div>

          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  Название
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) => setServiceName(event.target.value)}
                type="text"
                className={`${classes.modalBasicInput} ${classes.modalBasicInputService}`}
                id="name"
                required
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={createNewService}
            className={classes.controlBtn}
          >
            ДОБАВИТЬ
          </button>
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
