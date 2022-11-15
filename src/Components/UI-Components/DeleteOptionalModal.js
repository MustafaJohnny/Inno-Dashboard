import React from "react";
import axios from "axios";
import { controlActions } from "../Redux/ReduxStore";
import classes from "./ModalStyle.module.css";
import Overlay from "./Overlay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteOptionalModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);

  const deleteSomething = useSelector(
    (state) => state.controler.delete_something
  );

  const deleteSomethingID = useSelector(
    (state) => state.controler.delete_something_id
  );

  const optionalHideDeleteModal = () => {
    if (deleteSomething === "ресторан") {
      dispatch(controlActions.toggleDeleteRestaurant());
    }

    if (deleteSomething === "сервис") {
      dispatch(controlActions.toggleDeleteService());
    }

    if (deleteSomething === "меню") {
      dispatch(controlActions.toggleDeleteMenu());
    }
  };

  const optionalDeleteLogic = () => {
    if (deleteSomething === "ресторан") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerHome());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/rest/delRest`, {
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

    if (deleteSomething === "сервис") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerHome());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/serv/delService`, {
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

    if (deleteSomething === "меню") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerMenu());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/menu/del_menu`, {
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
  };

  return (
    <React.Fragment>
      <Overlay />
      <div className={`${classes.modal} ${classes.modalDesign}`}>
        <h1 className={classes.modalHeading}>Удалить {deleteSomething}</h1>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.confirmDesignHeading}>
              Вы действительно хотите удалить {deleteSomething}
            </h1>
          </div>
        </form>
        <div className={classes.modalControlBtnsArea}>
          <button onClick={optionalDeleteLogic} className={classes.controlBtn}>
            УДАЛИТЬ
          </button>
          <button
            onClick={optionalHideDeleteModal}
            className={`${classes.controlBtn} ${classes.cencelBtn}`}
          >
            Отменить
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
