import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddItem = () => {
    dispatch(controlActions.toggleAddItem());
  };

  let formIsValid = false;

  if (
    itemImage.size &&
    ItemName &&
    itemDescription &&
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

    let data = JSON.stringify({
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
    });

    const formData = new FormData();

    formData.append("in_file", itemImage, itemImage.name);
    formData.append("base", data);

    axios
      .post(
        `http://${serverAPI}/api/v1/menu/newProduct/${userLanguage}`,
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
        <h1 className={classes.modalHeading}>Добавить блюдо</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <div className={classes.requiredImgBox}>
              <input
                className={classes.inputImgModal}
                type="file"
                multiple
                accept="image/png, image/jpeg image/jpg"
                onChange={(event) => setItemImage(event.target.files[0])}
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
                onChange={(event) => setItemName(event.target.value)}
              />
            </div>

            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="address">
                  Описание
                </label>
                <span className={classes.required}>*</span>
              </div>
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
                  Тип Измерения
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
                  Параметр Измерения
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
                  Цена
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
                  Алкоголь?
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setItemAlchole(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
              </select>
            </div>

            <div className={classes.wholeModalInput}>
              <div className={classes.lableRequiredArea}>
                <label className={classes.modalBasicLable} htmlFor="lang">
                  Доставка
                </label>
                <span className={classes.required}>*</span>
              </div>

              <select
                onChange={(event) => setItemDelivery(event.target.value)}
                className={classes.modalBasicInput}
              >
                <option value=""></option>
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
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
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddItem}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
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
