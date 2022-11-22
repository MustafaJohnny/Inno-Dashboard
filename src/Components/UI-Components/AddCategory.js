import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import Upload from "../Icons/Upload.svg";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  
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

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

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
        `${process.env.REACT_APP_URL}/api/cat/newCategory/${userLanguage}`,
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
        <h1 className={classes.modalHeading}>
          {t("addBtnSmall")} {t("justCategory")}
        </h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <label className={classes.btnAddImgModal} htmlFor="fileImg">
                <img className={classes.uploadIcon} alt="icon" src={Upload} />
                <span className={classes.textBtnUpload}>{t("addPhoto")}</span>
              </label>
              <input
                className={classes.inputImgModal}
                type="file"
                id="fileImg"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setCategoryImage(event.target.files[0])}
                required
              />
              <span className={classes.requiredImg}>*</span>
            </div>
            <span className={classes.requiredImgMess}>
              {!formIsValid && t("imgLimit")}
            </span>
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="name">
                  {t("justName")}
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
                {t("justDescrip")}
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
            {t("addBtn")}
          </button>
          <button
            onClick={hideAddCategory}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
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
