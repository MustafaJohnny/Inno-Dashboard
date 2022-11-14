import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddMenu = () => {
  const [menuImage, setMenuImage] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");
  const [menuDescription, setMenudescription] = useState("");
  const [menuAllHours, setMenuAllHours] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userMenuID = useSelector((state) => state.controler.user_menu_ID);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let formIsValid = false;

  if (menuImage.size && menuName && menuAllHours) {
    formIsValid = true;
  }

  if (menuImage.size >= 1000000 || !menuImage) {
    formIsValid = false;
  }

  const hideAddMenu = () => {
    dispatch(controlActions.toggleAddMenu());
  };

  const createNewRestaurant = () => {
    dispatch(controlActions.toggleSpinnerMenu());
    hideAddMenu();

    const serverParams = {
      name: menuName,
      description: menuDescription,
      all_hours: menuAllHours,
      time_start: menuStartTime,
      time_end: menuEndTime,
      ids: userMenuID,
    };

    if (!serverParams.time_start) delete serverParams.time_start;
    if (!serverParams.time_end) delete serverParams.time_end;
    if (!serverParams.description) delete serverParams.description;

    const formData = new FormData();

    formData.append("in_file", menuImage, menuImage.name);

    axios
      .post(`http://${serverAPI}/api/menu/new/${userLanguage}`, formData, {
        params: serverParams,
        auth: {
          username: userEmail,
          password: userPassword,
        },
      })
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerMenu());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerMenu());
          dispatch(controlActions.toggleFallMenu());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить меню</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setMenuImage(event.target.files[0])}
                required
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && "Размер изображения должен быть меньше 1 мб"}
            </span>
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  Название
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setMenuName(event.target.value)}
              />
            </div>

            <div
              className={`${classes.wholeModalInput} ${classes.wholeModalInputGap}`}
            >
              <label className={classes.modalBasicLable} htmlFor="address">
                Описание
              </label>
              <input
                onChange={(event) => setMenudescription(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="lang">
                  Действует без ограничения времени
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setMenuAllHours(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </select>
            </div>
            <div className={classes.modalInputsContaine2}>
              <div className={classes.twoInputsArea}>
                <div className={classes.wholeModalInput}>
                  <label className={classes.modalBasicLable} htmlFor="start">
                    Начало работы
                  </label>
                  <input
                    onChange={(event) => setMenuStartTime(event.target.value)}
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
                    onChange={(event) => setMenuEndTime(event.target.value)}
                    type="time"
                    className={classes.modalBasicInput}
                    id="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={createNewRestaurant}
            className={classes.controlBtn}
          >
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddMenu}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddMenu} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddMenu;
