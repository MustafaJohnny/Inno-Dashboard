import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLanguage, setCategoryLanguage] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const appLanguages = useSelector((state) => state.controler.app_languages);
  const userCategoryID = useSelector(
    (state) => state.controler.user_category_ID
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddCategory = () => {
    dispatch(controlActions.toggleAddCategories());
  };

  const createNewCategory = () => {
    hideAddCategory();
    dispatch(controlActions.toggleSpinner());

    const serverParams = {
      name: categoryName,
      description: categoryDescription,
      menu_id: userCategoryID,
    };

    const formData = new FormData();

    formData.append("in_file", categoryImage, categoryImage.name);

    axios
      .post(
        `http://${serverAPI}/api/v1/menu/newCategory/${categoryLanguage}`,
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
        <h1 className={classes.modalHeading}>Добавить категорию</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setCategoryImage(event.target.files[0])}
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
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setCategoryLanguage(event.target.value)}
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
          </div>
          <div className={classes.wholeModalInput}>
            <label className={classes.modalBasicLable} htmlFor="address">
              Описание
            </label>
            <input
              onChange={(event) => setCategoryDescription(event.target.value)}
              type="text"
              className={classes.modalBasicInput}
              id="address"
            />
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={createNewCategory} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddCategory}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddCategory} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddCategory;
