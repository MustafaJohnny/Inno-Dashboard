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

    if (deleteSomething === "категорию") {
      dispatch(controlActions.toggleDeleteCategory());
    }

    if (deleteSomething === "блюдо") {
      dispatch(controlActions.toggleDeleteItem());
    }

    if (deleteSomething === "услугу") {
      dispatch(controlActions.toggleDeleteServiceItem());
    }

    if (deleteSomething === "стол") {
      dispatch(controlActions.toggleDeleteTable());
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

    if (deleteSomething === "категорию") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerCategories());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/cat/delCategory`, {
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

    if (deleteSomething === "блюдо") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerItems());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/prod/del_product`, {
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

    if (deleteSomething === "услугу") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerServices());

      const serverParams = {
        id: deleteSomethingID,
      };

      axios
        .delete(`http://${serverAPI}/api/serv/delUslugi`, {
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

    if (deleteSomething === "стол") {
      optionalHideDeleteModal();
      dispatch(controlActions.toggleSpinnerQR());

      axios
        .delete(
          `http://${serverAPI}/api/v1/table/table_delete/${deleteSomethingID}`,
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
        <h1 className={classes.modalHeading}>Удалить {deleteSomething}</h1>
        <form className={classes.modalForm}>
          <div className={classes.confirmDesignArea}>
            <h1 className={classes.deleteHeading}>
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
