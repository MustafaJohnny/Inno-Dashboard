import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EditCategory = () => {
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${userDomain}`;

  const edittedCategoryID = useSelector(
    (state) => state.controler.category_edit_id
  );

  const categoryOldData = useSelector(
    (state) => state.controler.category_old_data
  );

  const userLang = useSelector((state) => state.controler.user_first_language);

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLang.toLowerCase());
  }, []);

  let formIsValid = false;
  let imageIsValid = false;

  if (categoryImage.size || categoryName || categoryDescription) {
    formIsValid = true;
  }

  if (categoryImage.size >= 1000000) {
    formIsValid = false;
  }

  if (categoryImage.size <= 1000000) {
    imageIsValid = true;
  }

  const hideEditCategory = () => {
    dispatch(controlActions.toggleEditCategory());
  };

  const editCategory = () => {
    hideEditCategory();
    dispatch(controlActions.toggleSpinnerCategories());

    const serverParams = {
      name: categoryName,
      description: categoryDescription,
    };

    if (!serverParams.name) delete serverParams.name;
    if (!serverParams.description) delete serverParams.description;

    let newData = JSON.stringify(serverParams);

    const formData = new FormData();

    if (categoryImage.size) {
      formData.append("in_file", categoryImage, categoryImage.name);
    }

    if (serverParams) {
      formData.append("base", newData);
    }

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/cat/categoryDataChange/${edittedCategoryID}/${userLang}`,
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
            dispatch(
              controlActions.getUserCategories(response.data.categorymenu)
            );
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
          {t("justEDIT")} {t("justCategory")}
        </h1>
        <form className={classes.modalForm}>
          <div
            className={classes.inputImgArea2}
            style={{
              backgroundImage: `url("${URL}/${categoryOldData.image}")`,
            }}
          >
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
            </div>
            {!imageIsValid && (
              <span className={classes.requiredImgMess2}>{t("imgLimit")}</span>
            )}
          </div>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("justName")}
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder={categoryOldData.name}
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
                placeholder={categoryOldData.description}
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={editCategory}
            className={classes.controlBtn}
          >
            {t("saveBtn")}
          </button>
          <button
            onClick={hideEditCategory}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideEditCategory} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditCategory;
