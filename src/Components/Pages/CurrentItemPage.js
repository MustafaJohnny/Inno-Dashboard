import React from "react";
import axios from "axios";
import PenIcon from "../Icons/Pen.svg";
import DeleteIcon from "../Icons/Delete.svg";
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
import ChangeItemPrice from "../UI-Components/ChangeItemPrice";
import ChangeItemImg from "../UI-Components/ChangeItemImg";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";

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
        `http://${serverAPI}/api/prod/product_list/${currentCategoryID}`,
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
  const showSpinner = useSelector((state) => state.controler.show_spinner);

  const showChangeItemName = useSelector(
    (state) => state.controler.show_change_item_name
  );

  const showChangeItemDesc = useSelector(
    (state) => state.controler.show_change_item_desc
  );

  const showChangeItemPrice = useSelector(
    (state) => state.controler.show_change_item_price
  );

  const showChangeItemImg = useSelector(
    (state) => state.controler.show_change_item_img
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

  const displayChangeItemPrice = (itemOldPrice, itemID) => {
    dispatch(controlActions.toggleChangeItemPrice());
    dispatch(controlActions.setItemPriceValue(itemOldPrice));
    dispatch(controlActions.setCurrentItemID(itemID));
  };

  const displayChangeItemImg = (itemID) => {
    dispatch(controlActions.setCurrentItemID(itemID));
    dispatch(controlActions.toggleChangeItemImg());
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {showSpinner && <LoadingSpinner2 />}
        {showChangeItemName && <ChangeItemName />}
        {showChangeItemDesc && <ChangeItemDesc />}
        {showChangeItemPrice && <ChangeItemPrice />}
        {showChangeItemImg && <ChangeItemImg />}
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
                </div>
                <div className={classes.currentItemBox}>
                  <div
                    style={{
                      backgroundImage: `url("${URL}/${currentItem.image}")`,
                    }}
                    className={classes.itemBigImgBox}
                  >
                    <img
                      onClick={() => displayChangeItemImg(currentItem.id)}
                      src={PenIcon}
                      alt="icon"
                      className={classes.penIconCurrentImg}
                    />
                  </div>
                  <div className={classes.itemInputsBigBox}>
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
                              onClick={() =>
                                displayChangeItemPrice(
                                  currentItem.price,
                                  currentItem.id
                                )
                              }
                              src={PenIcon}
                              alt="icon"
                              className={classes.penIconCurrent}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* {currentItem.modifex[0].datamodifex[0].name} */}

                    <div className={classes.modifierInputsBox}>
                      <div className={classes.modifierHeadingArea}>
                        <h1 className={classes.modifierHeading}>
                          Исключающие модификаторы
                        </h1>

                        <button
                          className={`${classes.manageBtn} ${classes.modifierBtn}`}
                          type="button"
                        >
                          + Добавить модификатор
                        </button>
                      </div>

                      <div className={classes.wholeCurrentModifierEl}>
                        <label htmlFor="size" className={classes.LableModi}>
                          Название группы модификаторов
                        </label>
                        <div className={classes.inputAndEditArea}>
                          <p className={classes.currentItemInput}>Вес</p>

                          <img
                            src={PenIcon}
                            alt="icon"
                            className={classes.penIconCurrent}
                          />
                        </div>
                        <div className={classes.wholeModiferSelector}>
                          <input
                            type="text"
                            className={classes.modiferInputValue}
                            value="600 гр"
                            readOnly
                          />

                          <div className={classes.modiferPricingArea}>
                            <span
                              className={`${classes.modifierPrice} ${classes.modifierPrice1}`}
                            >
                              + 50
                            </span>
                            <span
                              className={`${classes.modifierPrice} ${classes.modifierPrice2}`}
                            >
                              РУБ
                            </span>
                          </div>

                          <div className={classes.modifierActionArea}>
                            <button
                              className={classes.activeMenuModi}
                              type="button"
                            >
                              Активный
                            </button>
                            <img
                              src={PenIcon}
                              alt="icon"
                              className={classes.penIconCurrent}
                            />

                            <img
                              src={DeleteIcon}
                              alt="icon"
                              className={classes.penIconCurrent}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className={classes.modiferAddOption}
                        >
                          + Добавить вариант
                        </button>
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
