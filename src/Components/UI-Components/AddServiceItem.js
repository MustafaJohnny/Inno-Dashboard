import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "../UI-Components/Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddServiceItem = () => {
  const [ItemServiceName, setServiceItemName] = useState("");
  const [ItemServiceLanguage, setServiceItemLanguage] = useState("");
  const [ItemServiceDescription, setServiceItemDescription] = useState("");
  const [ItemServicePrice, setServiceItemPrice] = useState("");

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const appLanguages = useSelector((state) => state.controler.app_languages);
  const userServiceID = useSelector((state) => state.controler.user_service_ID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideAddServiceItem = () => {
    dispatch(controlActions.toggleShowAddServiceItems());
  };

  const createNewServiceItem = () => {
    hideAddServiceItem();
    dispatch(controlActions.toggleSpinner());

    const serverParams = {
      name: ItemServiceName,
      price: ItemServicePrice,
      service_id: userServiceID,
      description: ItemServiceDescription,
    };

    axios
      .post(
        `http://${serverAPI}/api/v1/service/uslugi_new/${ItemServiceLanguage}`,
        {},
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
        <h1 className={classes.modalHeading}>Добавить услугу</h1>
        <form className={classes.modalForm}>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="name">
                Название
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setServiceItemName(event.target.value)}
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="lang">
                Язык
              </label>

              <select
                onChange={(event) => setServiceItemLanguage(event.target.value)}
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
                onChange={(event) =>
                  setServiceItemDescription(event.target.value)
                }
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable} htmlFor="address">
                цена
              </label>
              <input
                onChange={(event) => setServiceItemPrice(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={createNewServiceItem} className={classes.controlBtn}>
            ДОБАВИТЬ
          </button>
          <button
            onClick={hideAddServiceItem}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
          </button>
        </div>
        <button onClick={hideAddServiceItem} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddServiceItem;
