import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddMenu = () => {
  const [menuImage, setMenuImage] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuLanguage, setMenuLanguage] = useState("");
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");
  const [menuDescription, setMenudescription] = useState("");
  const [menuAllHours, setMenuAllHours] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const appLanguages = useSelector((state) => state.controler.app_languages);
  const userMenuID = useSelector((state) => state.controler.user_menu_ID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddMenu = () => {
    dispatch(controlActions.toggleAddMenu());
  };

  const createNewRestaurant = () => {
    hideAddMenu();
    dispatch(controlActions.toggleSpinner());
    
    const serverParams = {
      name: menuName,
      description: menuDescription,
      all_hours: menuAllHours,
      //   menu_start: menuStartTime,
      //   menu_end: menuEndTime,
      ids: userMenuID,
    };

    const formData = new FormData();

    formData.append("in_file", menuImage, menuImage.name);

    axios
      .post(`http://${serverAPI}/api/v1/menu/new/${menuLanguage}`, formData, {
        params: serverParams,
        auth: {
          username: userEmail,
          password: userPassword,
        },
      })
      .then((response) => {
        setTimeout(() => {
          if (response.data) {
            dispatch(controlActions.toggleSpinner());
            navigate(0);
          }
        }, 4000);
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить меню</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setMenuImage(event.target.files[0])}
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
                onChange={(event) => setMenuName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setMenuLanguage(event.target.value)}
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
              <label className={classes.modalBasicLable} htmlFor="lang">
                Действует без ограничения времени
              </label>

              <select
                onChange={(event) => setMenuAllHours(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </select>
            </div>
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
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={createNewRestaurant} className={classes.controlBtn}>
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
