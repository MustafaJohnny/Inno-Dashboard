import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditMenu = () => {
  const [menuImage, setMenuImage] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuStartTime, setMenuStartTime] = useState("");
  const [menuEndTime, setMenuEndTime] = useState("");
  const [menuDescription, setMenudescription] = useState("");
  const [menuAllHours, setMenuAllHours] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;
  const editedMenuID = useSelector((state) => state.controler.menu_edit_id);
  const menuOldData = useSelector((state) => state.controler.menu_old_data);
  const userLang = useSelector((state) => state.controler.user_first_language);

  let formIsValid = false;
  let imageIsValid = false;

  if (
    menuImage.size ||
    menuName ||
    menuDescription ||
    menuAllHours ||
    menuStartTime ||
    menuEndTime
  ) {
    formIsValid = true;
  }

  if (menuImage.size >= 1000000) {
    formIsValid = false;
  }

  if (menuImage.size <= 1000000) {
    imageIsValid = true;
  }

  const hideEditMenu = () => {
    dispatch(controlActions.toggleEditMenu());
  };

  const editMenu = () => {
    hideEditMenu();
    dispatch(controlActions.toggleSpinnerMenu());

    const serverParams = {
      name: menuName,
      description: menuDescription,
      all_hours: menuAllHours,
      time_start: menuStartTime,
      time_end: menuEndTime,
    };

    if (!serverParams.name) delete serverParams.name;
    if (!serverParams.description) delete serverParams.description;
    if (!serverParams.all_hours) delete serverParams.all_hours;
    if (!serverParams.time_start) delete serverParams.time_start;
    if (!serverParams.time_end) delete serverParams.time_end;

    let newData = JSON.stringify(serverParams);

    const formData = new FormData();

    if (menuImage.size) {
      formData.append("in_file", menuImage, menuImage.name);
    }

    if (serverParams) {
      formData.append("base", newData);
    }

    axios
      .patch(
        `http://${serverAPI}/api/menu/menuDataChange/${editedMenuID}/${userLang}`,
        formData,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.getUserMenus(response.data));
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
        <h1 className={classes.modalHeading}>Редактировать меню</h1>
        <form className={classes.modalForm}>
          <div
            className={classes.inputImgArea2}
            style={{
              backgroundImage: `url("${URL}/${menuOldData.image}")`,
            }}
          >
            <div className={classes.requiredImgBox}>
              <label className={classes.btnAddImgModal} htmlFor="fileImg">
                <img className={classes.uploadIcon} alt="icon" src={Upload} />
                <span className={classes.textBtnUpload}>ДОБАВИТЬ ФОТО</span>
              </label>
              <input
                className={classes.inputImgModal}
                type="file"
                id="fileImg"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setMenuImage(event.target.files[0])}
                required
              />
            </div>
            {!imageIsValid && (
              <span className={classes.requiredImgMess2}>
                {"Размер изображения должен быть меньше 1 мб"}
              </span>
            )}
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                Название
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setMenuName(event.target.value)}
                placeholder={menuOldData.name}
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
                placeholder={menuOldData.description}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="lang">
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
            <div className={classes.modalInputsContaine2}>
              <div className={classes.twoInputsArea}>
                <div className={classes.wholeModalInput}>
                  <label className={classes.modalBasicLable2} htmlFor="start">
                    Начало работы
                  </label>
                  <input
                    onChange={(event) => setMenuStartTime(event.target.value)}
                    type="time"
                    className={classes.modalBasicInput}
                    id="start"
                    placeholder={
                      !menuOldData.time_start ? "" : menuOldData.time_start
                    }
                  />
                </div>
                <div className={classes.wholeModalInput}>
                  <label className={classes.modalBasicLable2} htmlFor="end">
                    Конец работы
                  </label>
                  <input
                    onChange={(event) => setMenuEndTime(event.target.value)}
                    type="time"
                    className={classes.modalBasicInput}
                    id="end"
                    placeholder={
                      !menuOldData.time_end ? "" : menuOldData.time_end
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={editMenu}
            className={classes.controlBtn}
          >
            СОХРАНИТЬ
          </button>
          <button
            onClick={hideEditMenu}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideEditMenu} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditMenu;
