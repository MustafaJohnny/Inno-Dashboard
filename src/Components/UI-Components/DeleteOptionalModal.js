import React from "react";
import axios from "axios";
import { controlActions } from "../Redux/ReduxStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteOptionalModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const deleteSomething = useSelector(
    (state) => state.controler.delete_something
  );

  const deleteSomethingID = useSelector(
    (state) => state.controler.delete_something_id
  );

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

  const optionalHideDeleteModal = () => {
    if (deleteSomething === t("justRest")) {
      dispatch(controlActions.toggleDeleteRestaurant());
    }

    if (deleteSomething === t("justService")) {
      dispatch(controlActions.toggleDeleteService());
    }

    if (deleteSomething === t("justMenuSmall")) {
      dispatch(controlActions.toggleDeleteMenu());
    }

    if (deleteSomething === t("justCategory")) {
      dispatch(controlActions.toggleDeleteCategory());
    }

    if (deleteSomething === t("justItem")) {
      dispatch(controlActions.toggleDeleteItem());
    }

    if (deleteSomething === t("justServiceItem")) {
      dispatch(controlActions.toggleDeleteServiceItem());
    }

    if (deleteSomething === t("justTable")) {
      dispatch(controlActions.toggleDeleteTable());
    }
  };

  const optionalDeleteLogic = () => {
    if (deleteSomething === t("justRest")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerHome());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/rest/delRest`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
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
    }

    if (deleteSomething === t("justService")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerHome());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/serv/delService`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
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
    }

    if (deleteSomething === t("justMenuSmall")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerMenu());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/menu/del_menu`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
        .then((response) => {
          setTimeout(() => {
            if (response.status === 200) {
              dispatch(controlActions.getUserMenus(response.data));
              dispatch(controlActions.toggleSpinnerMenu());
              navigate(0);
            }
          }, 3000);
        })
        .catch((error) => {
          if (error) {
            dispatch(controlActions.toggleSpinnerMenu());
            dispatch(controlActions.toggleFallMenu());
          }
        });
    }

    if (deleteSomething === t("justCategory")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerCategories());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/cat/delCategory`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
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
    }

    if (deleteSomething === t("justItem")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerItems());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/prod/del_product`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
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
    }

    if (deleteSomething === t("justServiceItem")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerServices());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`${process.env.REACT_APP_URL}/api/serv/delUslugi`, {
          params: serverParams,
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
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
    }

    if (deleteSomething === t("justTable")) {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerQR());

      axios
        .delete(
          `${process.env.REACT_APP_URL}/api/v1/table/table_delete/${deleteSomethingID}`,
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
              dispatch(controlActions.toggleSpinnerQR());
              navigate(0);
            }
          }, 3000);
        })
        .catch((error) => {
          if (error) {
            dispatch(controlActions.toggleSpinnerQR());
            dispatch(controlActions.toggleFallQR());
          }
        });
    }
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modalDesign}`}>
        <h1 className={`${classes.modalHeading}`}>
          {t("justDelete")} {deleteSomething}
        </h1>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.deleteHeading}>
              {t("deleteText")} {deleteSomething}?
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={optionalDeleteLogic} className={classes.controlBtn}>
            ??????????????
          </button>
          <button
            onClick={optionalHideDeleteModal}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            ????????????????
          </button>
        </div>
        <button
          onClick={optionalHideDeleteModal}
          className={classes.btnCloseModal}
        >
          &times;
        </button>
      </div>
    </React.Fragment>
  );
};

export default DeleteOptionalModal;
