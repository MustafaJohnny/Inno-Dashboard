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
  const [itemLanguage, setItemLanguage] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const appLanguages = useSelector((state) => state.controler.app_languages);
  const userItemID = useSelector((state) => state.controler.user_item_ID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddItem = () => {
    dispatch(controlActions.toggleAddItem());
  };

  const createNewItem = () => {
    const serverParams = {};

    const formData = new FormData();

    formData.append("in_file", itemImage, itemImage.name);

    axios
      .post(
        `http://${serverAPI}/api/v1/menu/newProduct/${itemLanguage}`,
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
        if (response.data) {
          hideAddItem();
          navigate(0);
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
                Объем
              </label>
              <input
                onChange={(event) => setItemSize(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
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
