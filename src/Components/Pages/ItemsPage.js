import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";
import FallMessage from "../UI-Components/FallMessage";
import AddItem from "../UI-Components/AddItem";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userCurrency = useSelector((state) => state.controler.user_currency);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const showAddItem = useSelector((state) => state.controler.show_add_item);
  const userItemID = useSelector((state) => state.controler.user_item_ID);
  const userItems = useSelector((state) => state.controler.user_Items);
  const fallItems = useSelector((state) => state.controlershow_fall_items);
  const spinnerItems = useSelector(
    (state) => state.controler.show_spinner_items
  );

  const pageHeading = useSelector(
    (state) => state.controler.items_page_heading
  );

  const restaurantPageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const categoriesPageHeading = useSelector(
    (state) => state.controler.categories_page_heading
  );

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/prod/product_list/${userItemID}`,
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
      }
    };

    getData();
  }, []);

  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;

  const activateOrDeactivateItem = (menuID) => {
    axios
      .post(
        `http://${serverAPI}/api/prod/product_active_or_deactivate/${menuID}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        if (response) navigate(0);
      });
  };

  const unHideAddItem = () => {
    dispatch(controlActions.toggleAddItem());
  };

  const getClickedItemData = (event) => {
    const clickedItemID = event.target.id;
    const clickedItem = userItems[clickedItemID];
    dispatch(controlActions.setCurrentItemID(""));
    dispatch(controlActions.getUserCurrentItem(clickedItem));
    dispatch(controlActions.setCurrentItemPageHeading(clickedItem.name));

    if (clickedItemID) {
      navigate("/currentItem", {
        replace: false,
      });
    }
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {spinnerItems && <LoadingSpinner2 />}
        {fallItems && <FallMessage />}
        {showAddItem && <AddItem />}
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
                        {restaurantPageHeading} /
                      </Link>
                      <Link className={classes.pathAddress} to="/categories">
                        {categoriesPageHeading} /
                      </Link>
                      <Link className={classes.pathAddress} to="/Items">
                        {pageHeading}
                      </Link>
                    </div>
                  </div>
                  <div className={classes.twoBtnsManage}>
                    <button
                      onClick={unHideAddItem}
                      className={classes.manageBtn}
                      type="button"
                    >
                      + Добавить блюдо
                    </button>
                  </div>
                </div>
                <div className={classes.justItemsContainer}>
                  {userItems.map((ele, index) => (
                    <div
                      onClick={getClickedItemData}
                      id={index}
                      key={ele.id}
                      className={classes.wholeItemElement}
                    >
                      <div
                        id={index}
                        style={{
                          backgroundImage: `url("${URL}/${ele.image}")`,
                        }}
                        className={classes.itemImgBox}
                      ></div>
                      <div id={index} className={classes.itemContentBox}>
                        <div id={index} className={classes.innerItem}>
                          <span id={index} className={classes.itemHeading}>
                            {ele.name}
                          </span>
                          <span id={index} className={classes.itemSize}>
                            {ele.modifex[0].datamodifex[0].name}
                          </span>
                          <span id={index} className={classes.itemDescription}>
                            {ele.description}
                          </span>
                        </div>
                        <div id={index} className={classes.itemPriceActiveArea}>
                          <span
                            id={index}
                            className={classes.itemPrice}
                          >{`${ele.price} ${userCurrency}`}</span>
                          <button
                            onClick={() => activateOrDeactivateItem(ele.id)}
                            className={
                              ele.is_active
                                ? classes.activeMenu
                                : classes.notActiveMenu
                            }
                            type="button"
                          >
                            {ele.is_active ? "Активный" : "Неактивный"}
                          </button>
                        </div>
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

export default React.memo(ItemsPage);
