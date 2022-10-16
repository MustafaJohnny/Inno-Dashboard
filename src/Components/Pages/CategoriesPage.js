import React from "react";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import AddMenu from "../UI-Components/AddMenu";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAddMenu = useSelector((state) => state.controler.show_add_menu);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userMenuID = useSelector((state) => state.controler.user_menu_ID);
  const userMenus = useSelector((state) => state.controler.user_menus);

  //Testing

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/dash/rest_menu_list/${userMenuID}`,
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

  //Testing

  const pageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateCategory = (menuID) => {
    axios
      .post(
        `http://${serverAPI}/api/v1/menu/menu_active_or_deactivate/${menuID}`,
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

  return (
    <React.Fragment>
      <section>
        {showAddMenu && <AddMenu />}
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.changeContentBox}>
              <div className={classes.managmentContent}>
                <div className={classes.managementBtnsArea}>
                  <h1 className={classes.managementHeading}>{pageHeading}</h1>
                  <div className={classes.twoBtnsManage}>
                    <button className={classes.manageBtn} type="button">
                      Редактировать меню
                    </button>
                    <button
                      onClick={unHideAddMenu}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + Добавить категорию
                    </button>
                  </div>
                </div>

                <div className={classes.managementRestaurents}>
                  {userMenus.map((ele, index) => (
                    <div
                      style={{
                        backgroundImage: `url("${URL}/${ele.image}")`,
                      }}
                      key={ele.id}
                      id={index}
                      className={classes.itemRestaurent}
                    >
                      <button
                        onClick={() => activateOrDeactivateCategory(ele.id)}
                        className={
                          ele.is_active
                            ? classes.activeMenu
                            : classes.notActiveMenu
                        }
                        type="button"
                      >
                        {ele.is_active ? "Активный" : "Неактивный"}
                      </button>
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

export default React.memo(CategoriesPage);
