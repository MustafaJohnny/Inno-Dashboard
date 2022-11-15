import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import actionBin from "../Icons/actionBin.svg";
import actionPen from "../Icons/actionPen.svg";
import ArrowBack from "../Icons/ArrowBack.svg";
import UpNavigation from "../UI-Components/UpNavigation";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";
import DeleteOptionalModal from "../UI-Components/DeleteOptionalModal";
import EditMenu from "../UI-Components/EditMenu";
import FallMessage from "../UI-Components/FallMessage";
import AddMenu from "../UI-Components/AddMenu";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const MenusPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAddMenu = useSelector((state) => state.controler.show_add_menu);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userMenuID = useSelector((state) => state.controler.user_menu_ID);
  const userMenus = useSelector((state) => state.controler.user_menus);
  const spinnerMenu = useSelector((state) => state.controler.show_spinner_menu);
  const fallMenu = useSelector((state) => state.controler.show_fall_menu);
  const showEditMenu = useSelector((state) => state.controler.show_edit_menu);

  const showDeleteMenu = useSelector(
    (state) => state.controler.show_delete_menu
  );

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/menu/rest_menu_list/${userMenuID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserMenus(request.data));
      }
    };
    getData();
  }, []);

  const pageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateMenu = (menuID) => {
    axios
      .post(
        `http://${serverAPI}/api/menu/menu_active_or_deactivate/${menuID}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate(0);
      });
  };

  const unHideAddMenu = () => {
    dispatch(controlActions.toggleAddMenu());
  };

  const getClickedMenu = (event) => {
    const clickedMenuID = userMenus[event.target.id].id;
    const clickedMenuHeading = userMenus[event.target.id].name;

    dispatch(controlActions.setCategoriesPageHeading(clickedMenuHeading));
    dispatch(controlActions.getUserCategoryID(clickedMenuID));

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/cat/category_list/${clickedMenuID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserCategories(request.data.categorymenu));
        navigate("/categories", {
          replace: false,
        });
      }
    };
    getData();
  };

  // Code for editing and deleting menus

  const displayEditMenu = (menuIndex) => {
    dispatch(controlActions.getEditMenuData(userMenus[menuIndex]));
    dispatch(controlActions.toggleEditMenu());
  };

  const displayDeleteMenu = (menuID) => {
    dispatch(controlActions.toggleDeleteMenu(menuID));
    dispatch(controlActions.getDeleteSomething("меню"));
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {fallMenu && <FallMessage />}
        {spinnerMenu && <LoadingSpinner2 />}
        {showAddMenu && <AddMenu />}
        {showEditMenu && <EditMenu />}
        {showDeleteMenu && <DeleteOptionalModal />}
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.changeContentBox}>
              <div className={classes.managmentContent}>
                <div className={classes.managementBtnsArea}>
                  <div className={classes.headingHeadingInner}>
                    <div className={classes.headArrowArea}>
                      <img
                        onClick={goPageBack}
                        src={ArrowBack}
                        alt="icon"
                        className={classes.arrowBack}
                      />
                      <h1 className={classes.managementHeading}>
                        {pageHeading}
                      </h1>
                    </div>
                    <div className={classes.pathAddressArea}>
                      <Link className={classes.pathAddress} to="/home">
                        Менеджмент /
                      </Link>
                      <Link className={classes.pathAddress} to="/menus">
                        {pageHeading}
                      </Link>
                    </div>
                  </div>
                  <div className={classes.twoBtnsManage}>
                    <button
                      onClick={unHideAddMenu}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + Добавить меню
                    </button>
                  </div>
                </div>

                <div className={classes.managementRestaurents}>
                  {userMenus.map((ele, index) => (
                    <div
                      onClick={getClickedMenu}
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
                      <div className={classes.anItemOnlyActionBox}>
                        <button
                          onClick={() => activateOrDeactivateMenu(ele.id)}
                          className={
                            ele.is_active
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {ele.is_active ? "Активный" : "Неактивный"}
                        </button>

                        <button
                          onClick={() => displayEditMenu(index)}
                          className={classes.editWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionPen}
                          />
                        </button>

                        <button
                          onClick={() => displayDeleteMenu(ele.id)}
                          className={classes.deleteWholeThingBtn}
                        >
                          <img
                            className={classes.actionPenIcon}
                            alt="icon"
                            src={actionBin}
                          />
                        </button>
                      </div>

                      <div className={classes.packageArea}>
                        <span id={index} className={classes.itemRestHeading}>
                          {ele.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(MenusPage);
