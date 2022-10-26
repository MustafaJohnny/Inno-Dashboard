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
  const [itemLanguage, setItemLanguage] = useState("");
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
  const appLanguages = useSelector((state) => state.controler.app_languages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddItem = () => {
    dispatch(controlActions.toggleAddItem());
  };

  const createNewItem = () => {
    hideAddItem();
    dispatch(controlActions.toggleSpinner());

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
        `http://${serverAPI}/api/v1/menu/newProduct/${itemLanguage}`,
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
        <h1 className={classes.modalHeading}>Добавить блюдо</h1>
        <form className={classes.modalForm}>
          <div className={classes.inputImgArea}>
            <input
              className={classes.inputImgModal}
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => setItemImage(event.target.files[0])}
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
                onChange={(event) => setItemName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setItemLanguage(event.target.value)}
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
                onChange={(event) => setItemDescription(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="address">
                Тип Измерения
              </label>
              <input
                onChange={(event) => setItemMeasurementType(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="address">
                Параметр Измерения
              </label>
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
              <label className={classes.modalBasicLable} htmlFor="address">
                Цена
              </label>
              <input
                onChange={(event) => setItemPrice(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>

            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Алкоголь?
              </label>

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
              <label className={classes.modalBasicLable} htmlFor="lang">
                Доставка
              </label>

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
          <button onClick={createNewItem} className={classes.controlBtn}>
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
