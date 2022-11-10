import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const userCategoryID = useSelector(
    (state) => state.controler.user_category_ID
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let formIsValid = false;

  if (categoryImage.size && categoryName) {
    formIsValid = true;
  }

  if (categoryImage.size >= 1000000 || !categoryImage) {
    formIsValid = false;
  }

  const hideAddCategory = () => {
    dispatch(controlActions.toggleAddCategories());
  };

  const createNewCategory = () => {
    hideAddCategory();
    dispatch(controlActions.toggleSpinnerCategories());

    if (!formIsValid) {
      return;
    }

    const serverParams = {
      name: categoryName,
      description: categoryDescription,
      menu_id: userCategoryID,
    };

    if (!serverParams.description) delete serverParams.description;

    const formData = new FormData();

    formData.append("in_file", categoryImage, categoryImage.name);

    axios
      .post(
        `http://${serverAPI}/api/cat/newCategory/${userLanguage}`,
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
            dispatch(controlActions.toggleSpinnerCategories());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerCategories());
          dispatch(controlActions.toggleFallCategories());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>Добавить категорию</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setCategoryImage(event.target.files[0])}
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
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </div>
            <div
              className={`${classes.wholeModalInput} ${classes.wholeModalInputGap}`}
            >
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
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={createNewCategory}
            className={classes.controlBtn}
          >
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
