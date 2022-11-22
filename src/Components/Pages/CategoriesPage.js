import React from "react";
import actionBin from "../Icons/actionBin.svg";
import actionPen from "../Icons/actionPen.svg";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import FallMessage from "../UI-Components/FallMessage";
import DeleteOptionalModal from "../UI-Components/DeleteOptionalModal";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";
import UpNavigation from "../UI-Components/UpNavigation";
import AddCategory from "../UI-Components/AddCategory";
import EditCategory from "../UI-Components/EditCategory";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";
import { t } from "i18next";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const spinnerCategories = useSelector(
    (state) => state.controler.show_spinner_categories
  );

  const fallCategories = useSelector(
    (state) => state.controler.show_fall_categories
  );

  const showAddCategory = useSelector(
    (state) => state.controler.show_add_categories
  );

  const showEditCategory = useSelector(
    (state) => state.controler.show_edit_category
  );

  const showDeleteCategory = useSelector(
    (state) => state.controler.show_delete_category
  );

  const userCategoryID = useSelector(
    (state) => state.controler.user_category_ID
  );

  const restaurantPageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const pageHeading = useSelector(
    (state) => state.controler.categories_page_heading
  );

  const userCategories = useSelector(
    (state) => state.controler.user_categories
  );

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/cat/category_list/${userCategoryID}`,
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
      }
    };
    getData();
  }, []);

  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateCategory = (menuID) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/api/cat/category_active_or_deactivate/${menuID}`,
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

  const unHideAddCategory = () => {
    dispatch(controlActions.toggleAddCategories());
  };

  const getClickedCategory = (event) => {
    const clickedCategoryID = userCategories[event.target.id].id;
    const clickedCategoryHeading = userCategories[event.target.id].name;

    dispatch(controlActions.setItemsPageHeading(clickedCategoryHeading));
    dispatch(controlActions.getUserItemID(clickedCategoryID));

    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_URL}/api/prod/product_list/${clickedCategoryID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserItems(request.data.product));
        navigate("/Items", {
          replace: false,
        });
      }
    };
    getData();
  };

  // Code for editing and deleting categories..

  const displayEditCategory = (categoryIndex) => {
    dispatch(controlActions.getEditCategoryData(userCategories[categoryIndex]));
    dispatch(controlActions.toggleEditCategory());
  };

  const displayDeleteCategory = (categoryID) => {
    dispatch(controlActions.toggleDeleteCategory(categoryID));
    dispatch(controlActions.getDeleteSomething(t("justCategory")));
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {fallCategories && <FallMessage />}
        {spinnerCategories && <LoadingSpinner2 />}
        {showAddCategory && <AddCategory />}
        {showEditCategory && <EditCategory />}
        {showDeleteCategory && <DeleteOptionalModal />}
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
                        {t("managementNav")} /
                      </Link>
                      <Link className={classes.pathAddress} to="/menus">
                        {restaurantPageHeading} /
                      </Link>
                      <Link className={classes.pathAddress} to="/categories">
                        {pageHeading}
                      </Link>
                    </div>
                  </div>
                  <div className={classes.twoBtnsManage}>
                    <button
                      onClick={unHideAddCategory}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + {t("addBtnSmall")} {t("justCategory")}
                    </button>
                  </div>
                </div>

                {userCategories.length <= 0 ? (
                  <div className={classes.emptyMsgInnerHeading}>
                    <h1 className={classes.emptyMsgHomePage}>
                      {t("emptyCategory")}
                    </h1>
                  </div>
                ) : (
                  <div className={classes.managementRestaurents}>
                    {userCategories.map((ele, index) => (
                      <div
                        onClick={getClickedCategory}
                        style={{
                          backgroundImage: `url("${URL}/${ele.image}")`,
                        }}
                        key={ele.id}
                        id={index}
                        className={classes.itemRestaurent}
                      >
                        <div className={classes.anItemOnlyActionBox}>
                          <button
                            onClick={() => activateOrDeactivateCategory(ele.id)}
                            className={
                              ele.is_active
                                ? classes.activeMenu
                                : classes.notActiveMenu
                            }
                            type="button"
                          >
                            {ele.is_active ? t("active") : t("notActive")}
                          </button>

                          <button
                            onClick={() => displayEditCategory(index)}
                            className={classes.editWholeThingBtn}
                          >
                            <img
                              className={classes.actionPenIcon}
                              alt="icon"
                              src={actionPen}
                            />
                          </button>

                          <button
                            onClick={() => displayDeleteCategory(ele.id)}
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
                )}
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(CategoriesPage);
