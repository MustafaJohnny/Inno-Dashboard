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

const AddItem = () => {
  const [itemImage, setItemImage] = useState([]);
  const [ItemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemMeasurementType, setItemMeasurementType] = useState("");
  const [itemMeasurementParameter, setItemMeasurementParameter] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemAlchole, setItemAlchole] = useState("");
  const [itemDelivery, setItemDelivery] = useState("");

  const userItemID = useSelector((state) => state.controler.user_item_ID);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddItem = () => {
    dispatch(controlActions.toggleAddItem());
  };

  let formIsValid = false;

  if (
    itemImage.size &&
    ItemName &&
    itemMeasurementType &&
    itemMeasurementParameter &&
    itemPrice &&
    itemAlchole &&
    itemDelivery
  ) {
    formIsValid = true;
  }

  if (itemImage.size >= 1000000 || !itemImage) {
    formIsValid = false;
  }

  const createNewItem = () => {
    hideAddItem();
    dispatch(controlActions.toggleSpinnerItems());

    if (!formIsValid) {
      return;
    }

    let data = {
      prod: {
        name: ItemName,
        description: itemDescription,
        price: itemPrice,
        is_alcohol: itemAlchole,
        delivery: itemDelivery,
        tax: 0,
        categorymenu_id: userItemID,
      },
      mod: {
        name: itemMeasurementType,
        description: "",
      },
      datamod: {
        name: itemMeasurementParameter,
        description: "",
      },
    };

    if (!data.prod.description) delete data.prod.description;

    let newData = JSON.stringify(data);

    const formData = new FormData();

    formData.append("in_file", itemImage, itemImage.name);
    formData.append("base", newData);

    axios
      .post(
        `${process.env.REACT_APP_URL}/api/prod/newProduct/${userLanguage}`,
        formData,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          if (response.status === 200) {
            dispatch(controlActions.toggleSpinnerItems());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerItems());
          dispatch(controlActions.toggleFallItems());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>
          {t("addBtnSmall")} {t("justItem")}
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
                onChange={(event) => setItemImage(event.target.files[0])}
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
                onChange={(event) => setItemName(event.target.value)}
              />
            </div>

            <div
              className={`${classes.wholeModalInput} ${classes.wholeModalInputGap}`}
            >
              <label className={classes.modalBasicLable} htmlFor="address">
                {t("justDescrip")}
              </label>
              <input
                onChange={(event) => setItemDescription(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="address">
                  {t("mostModifName")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) => setItemMeasurementType(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="address">
                  {t("mostModifValue")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) =>
                  setItemMeasurementParameter(event.target.value)
                }
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="address">
                  {t("justPrice")}
                </label>
                <span className={classes.required}>*</span>
              </div>
              <input
                onChange={(event) => setItemPrice(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>

            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="lang">
                  {t("chole")}
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setItemAlchole(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>{t("yes")}</option>
                <option value={false}>{t("no")}</option>
              </select>
            </div>

            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="lang">
                  {t("delivery")}
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setItemDelivery(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>{t("yes")}</option>
                <option value={false}>{t("no")}</option>
              </select>
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={createNewItem}
            className={classes.controlBtn}
          >
            {t("addBtn")}
          </button>
          <button
            onClick={hideAddItem}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideAddItem} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddItem;
