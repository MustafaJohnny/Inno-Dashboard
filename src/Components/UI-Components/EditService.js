import React from "react";
import axios from "axios";
import Upload from "../Icons/Upload.svg";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { controlActions } from "../Redux/ReduxStore";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditService = () => {
  const [serviceImage, setServiceImage] = useState([]);
  const [serviceName, setServiceName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;

  const editedServiceID = useSelector(
    (state) => state.controler.service_edit_id
  );
  const serviceOldData = useSelector(
    (state) => state.controler.service_old_data
  );

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

  let formIsValid = false;
  let imageIsValid = false;

  if (serviceImage.size || serviceName) {
    formIsValid = true;
  }

  if (serviceImage.size >= 1000000) {
    formIsValid = false;
  }

  if (serviceImage.size <= 1000000) {
    imageIsValid = true;
  }

  const hideEditService = () => {
    dispatch(controlActions.toggleEditService());
  };

  const EditRestaurant = () => {
    hideEditService();
    dispatch(controlActions.toggleSpinnerHome());

    const serverParams = {
      name_service: serviceName,
    };

    if (!serverParams.name_service) delete serverParams.name_service;

    let newData = JSON.stringify(serverParams);

    const formData = new FormData();

    if (serviceImage.size) {
      formData.append("in_file", serviceImage, serviceImage.name);
    }

    if (serverParams) {
      formData.append("base", newData);
    }

    axios
      .patch(
        `http://${serverAPI}/api/serv/serviceDataChange/${editedServiceID}/${userLanguage}`,
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
            dispatch(controlActions.getUserDataAfterLogin(response.data));
            dispatch(controlActions.toggleSpinnerHome());
            navigate(0);
          }
        }, 3000);
      })
      .catch((error) => {
        if (error) {
          dispatch(controlActions.toggleSpinnerHome());
          dispatch(controlActions.toggleFallHome());
        }
      });
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={classes.modal}>
        <h1 className={classes.modalHeading}>{t("editService")}</h1>
        <form className={classes.modalForm}>
          <div
            className={classes.inputImgArea2}
            style={{
              backgroundImage: `url("${URL}/${serviceOldData.image}")`,
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
                onChange={(event) => setServiceImage(event.target.files[0])}
                required
              />
            </div>
            {!imageIsValid && (
              <span className={classes.requiredImgMess2}>{t("imgLimit")}</span>
            )}
          </div>
          <div
            className={`${classes.modalInputsContainer} ${classes.modalContainerService}`}
          >
            <div className={classes.wholeModalInput}>
              <label className={classes.modalBasicLable2} htmlFor="name">
                {t("justName")}
              </label>
              <input
                type="text"
                className={classes.modalBasicInput}
                id="name"
                onChange={(event) => setServiceName(event.target.value)}
                placeholder={serviceOldData.name_service}
              />
            </div>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button
            disabled={!formIsValid}
            onClick={EditRestaurant}
            className={classes.controlBtn}
          >
            {t("saveBtn")}
          </button>
          <button
            onClick={hideEditService}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            {t("cancelBtn")}
          </button>
        </div>
        <button onClick={hideEditService} className={classes.btnCloseModal}>
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditService;
