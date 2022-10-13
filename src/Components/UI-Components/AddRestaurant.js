import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddRestaurant = () => {
  const [restImage, setRestImage] = useState([]);
  const [restName, setRestName] = useState("");
  const [restLanguage, setRestLanguage] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restStartTime, setRestStartTime] = useState("");
  const [restEndTime, setRestEndTime] = useState("");
  const [restTimeZone, setRestTimeZone] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const appLanguages = useSelector((state) => state.controler.app_languages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddRestaurent = () => {
    dispatch(controlActions.toggleAddRestaurant());
  };

  const createNewRestaurant = () => {
    const serverParams = {
      name_rest: restName,
      addr_rest: restAddress,
      tel_rest: restPhone,
      // time_start: restStartTime,
      // time_end: restEndTime,
      timezone: restTimeZone,
    };

    // if (!serviceName) return;
    // if (!serviceImage) return;

    const formData = new FormData();

    formData.append("in_file", restImage, restImage.name);

    axios
      .post(
        `http://${serverAPI}/api/v1/owner/rest_new/${restLanguage}`,
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
        if (response.data) {
          hideAddRestaurent();
          navigate(0);
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить ресторан</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setRestImage(event.target.files[0])}
              required
            />
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Название
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setRestName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setRestLanguage(event.target.value)}
                id="lang"
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                {appLanguages.map((element, index) => (
                  <option key={index} value={element[0]}>
                    {" "}
                    {element[1]}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="address">
                Адрес
              </label>
              <input
                onChange={(event) => setRestAddress(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="phone">
                Телефон
              </label>
              <input
                onChange={(event) => setRestPhone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="phone"
              />
            </div>
          </div>
          <div className={classes.modalInputsContaine2}>
            <div className={classes.twoInputsArea}>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable} htmlFor="start">
                  Начало работы
                </label>
                <input
                  onChange={(event) => setRestStartTime(event.target.value)}
                  type="time"
                  className={classes.modalBasicInput}
                  id="start"
                />
              </div>
              <div className={classes.wholeModalInput}>
                <label className={classes.modalBasicLable} htmlFor="end">
                  Конец работы
                </label>
                <input
                  onChange={(event) => setRestEndTime(event.target.value)}
                  type="time"
                  className={classes.modalBasicInput}
                  id="end"
                />
              </div>
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="zone">
                Временная зона
              </label>
              <input
                onChange={(event) => setRestTimeZone(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={createNewRestaurant} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddRestaurent}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddRestaurent} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddRestaurant;
