import React from "react";
import axios from "axios";
import PenIcon from "../Icons/Pen.svg";
import classes from "./HomePage.module.css";
import ArrowBack from "../Icons/ArrowBack.svg";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import UpNavigation from "../UI-Components/UpNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import ChangeItemName from "../UI-Components/ChangeItemName";
import ChangeItemDesc from "../UI-Components/ChangeItemDesc";

const CurrentItemsPage = () => {
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const userPassword = useSelector((state) => state.controler.user_password);
  const itemCurrentID = useSelector((state) => state.controler.item_current_ID);
  const currentCategoryID = useSelector(
    (state) => state.controler.user_item_ID
  );

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/dash/product_list/${currentCategoryID}`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        const updatedCurrentItem = request.data.product.filter(
          (ele) => ele.id === itemCurrentID
        );

        if (updatedCurrentItem.length !== 0) {
          dispatch(controlActions.getUserCurrentItem(updatedCurrentItem[0]));
        }
      }
    };

    getData();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCurrency = useSelector((state) => state.controler.user_currency);
  const currentItem = useSelector((state) => state.controler.user_current_item);

  const showChangeItemName = useSelector(
    (state) => state.controler.show_change_item_name
  );

  const showChangeItemDesc = useSelector(
    (state) => state.controler.show_change_item_desc
  );

  const restaurantPageHeading = useSelector(
    (state) => state.controler.restaurant_page_heading
  );

  const categoriesPageHeading = useSelector(
    (state) => state.controler.categories_page_heading
  );

  const ItemspageHeading = useSelector(
    (state) => state.controler.items_page_heading
  );

  const pageHeading = useSelector(
    (state) => state.controler.current_item_page_heading
  );

  const URL = `http://${serverAPI}/api/v1/client/fileimage/${userDomain}`;

  const displayChangeItemName = (itemOldName, itemID) => {
    dispatch(controlActions.toggleChangeItemName());
    dispatch(controlActions.setItemNameValue(itemOldName));
    dispatch(controlActions.setCurrentItemID(itemID));
  };

  const displayChangeItemDesc = (itemOldDesc, itemID) => {
    dispatch(controlActions.toggleChangeItemDesc());
    dispatch(controlActions.setItemDescValue(itemOldDesc));
    dispatch(controlActions.setCurrentItemID(itemID));
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {showChangeItemName && <ChangeItemName />}
        {showChangeItemDesc && <ChangeItemDesc />}
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
                        {ItemspageHeading} /
                      </Link>
                      <Link className={classes.pathAddress} to="/currentItem">
                        {pageHeading}
                      </Link>
                    </div>
                  </div>
                  <div className={classes.twoBtnsManage}>
                    <button className={classes.manageBtn} type="button">
                      + Добавить модификатор
                    </button>
                  </div>
                </div>
                <div className={classes.currentItemBox}>
                  <div
                    style={{
                      backgroundImage: `url("${URL}/${currentItem.image}")`,
                    }}
                    className={classes.itemBigImgBox}
                  ></div>
                  <div className={classes.itemInputsBox}>
                    <div className={classes.wholeCurrentItemInput}>
                      <label
                        htmlFor="name"
                        className={classes.currentItemLable}
                      >
                        Название
                      </label>
                      <div className={classes.inputAndEditArea}>
                        <p className={classes.currentItemInput}>
                          {currentItem.name}
                        </p>

                        <img
                          onClick={() =>
                            displayChangeItemName(
                              currentItem.name,
                              currentItem.id
                            )
                          }
                          src={PenIcon}
                          alt="icon"
                          className={classes.penIconCurrent}
                        />
                      </div>
                    </div>

                    <div className={classes.wholeCurrentItemInput}>
                      <label
                        htmlFor="descrip"
                        className={classes.currentItemLable}
                      >
                        Описание
                      </label>
                      <div className={classes.inputAndEditArea}>
                        <p className={classes.currentItemInput}>
                          {currentItem.description}
                        </p>
                        <img
                          onClick={() =>
                            displayChangeItemDesc(
                              currentItem.description,
                              currentItem.id
                            )
                          }
                          src={PenIcon}
                          alt="icon"
                          className={classes.penIconCurrent}
                        />
                      </div>
                    </div>
                    <div className={classes.twoWholeCurrentInputArea}>
                      <div className={classes.wholeCurrentItemInput}>
                        <label
                          htmlFor="price"
                          className={classes.currentItemLable}
                        >
                          Цена
                        </label>
                        <div className={classes.inputAndEditArea}>
                          <p className={classes.currentItemInput}>
                            {`${currentItem.price} ${userCurrency}`}
                          </p>

                          <img
                            src={PenIcon}
                            alt="icon"
                            className={classes.penIconCurrent}
                          />
                        </div>
                      </div>
                      <div className={classes.wholeCurrentItemInput}>
                        <label
                          htmlFor="size"
                          className={classes.currentItemLable}
                        >
                          Вес
                        </label>
                        <div className={classes.inputAndEditArea}>
                          <p className={classes.currentItemInput}>
                            {currentItem.modifex[0].datamodifex[0].name}
                          </p>

                          <img
                            src={PenIcon}
                            alt="icon"
                            className={classes.penIconCurrent}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(CurrentItemsPage);
