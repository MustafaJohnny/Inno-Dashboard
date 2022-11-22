import React from "react";
import axios from "axios";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { useTranslation } from "react-i18next";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditServiceItem = () => {
  const [ItemServiceName, setServiceItemName] = useState("");
  const [ItemServiceDescription, setServiceItemDescription] = useState("");
  const [ItemServicePrice, setServiceItemPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const serviceItemEditId = useSelector(
    (state) => state.controler.service_item_edit_id
  );

  const serviceItemOldData = useSelector(
    (state) => state.controler.service_item_old_data
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

  if (ItemServiceName || ItemServiceDescription || ItemServicePrice) {
    formIsValid = true;
  }

  const UnDissplayEditServiceItem = () => {
    dispatch(controlActions.toggleEditServiceItem());
  };

  const editServiceItem = () => {
    UnDissplayEditServiceItem();
    dispatch(controlActions.toggleSpinnerServices());

    const serverParams = {
      name: ItemServiceName,
      price: ItemServicePrice,
      description: ItemServiceDescription,
    };

    if (!serverParams.name) delete serverParams.name;
    if (!serverParams.price) delete serverParams.price;
    if (!serverParams.description) delete serverParams.description;

    const formData = new FormData();

    if (!formIsValid) return;

    axios
      .patch(
        `${process.env.REACT_APP_URL}/api/serv/uslugiChangeData/${serviceItemEditId}/${userLang}`,
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
            dispatch(controlActions.getUserServiceItems(response.data));
            dispatch(controlActions.toggleSpinnerServices());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerServices());
          dispatch(controlActions.toggleFallServices());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>
          {t("justEDIT")} {t("justServiceItem")}
        </h1>
        <form className={classes.modalForm}>
          <div className={classes.modalInputsContainer}>
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("justName")}
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setServiceItemName(event.target.value)}
                placeholder={serviceItemOldData.name}
              />
            </div>

            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="address">
                {t("justPrice")}
              </label>
              <input
                onChange={(event) => setServiceItemPrice(event.target.value)}
                type="text"
                className={classes.modalBasicInput}
                id="address"
                placeholder={serviceItemOldData.price}
              />
            </div>
          </div>

          <div
            className={`${classes.wholeModalInput} ${classes.wholeModalInputGap}`}
          >
            <label className={classes.modalBasicLable} htmlFor="address">
              {t("justDescrip")}
            </label>
            <input
              onChange={(event) =>
                setServiceItemDescription(event.target.value)
              }
              type="text"
              className={classes.modalBasicInput}
              id="address"
              placeholder={serviceItemOldData.description}
            />
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={editServiceItem}
            className={classes.controlBtn}
          >
            {t("saveBtn")}
          </button>
          <button
            onClick={UnDissplayEditServiceItem}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button
          onClick={UnDissplayEditServiceItem}
          className={classes.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditServiceItem;
