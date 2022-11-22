import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import axios from "axios";
import eyeIcon from "../Icons/eyeIcon.svg";
import downlodIcon from "../Icons/downlodIcon.svg";
import FallMessage from "../UI-Components/FallMessage";
import QRbtnIcon from "../Icons/QRbtn.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import AddTableQR from "../UI-Components/AddTableQR";
import AddTables from "../UI-Components/AddTables";
import ModalImgQR from "../UI-Components/ModaImgQR";
import LoadingSpinner2 from "../UI-Components/LoadingSpinner2";
import DeleteOptionalModal from "../UI-Components/DeleteOptionalModal";
import { useTranslation } from "react-i18next";
import actionBin from "../Icons/actionBin.svg";
import actionPen from "../Icons/actionPen.svg";
import classes from "./SettingsQRPages.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { controlActions } from "../Redux/ReduxStore";

const QRcodesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  const userEmail = useSelector((state) => state.controler.user_email);
  const userPassword = useSelector((state) => state.controler.user_password);
  const userQRCodes = useSelector((state) => state.controler.user_QR_Codes);
  const showTableQR = useSelector((state) => state.controler.show_add_table_QR);
  const showTables = useSelector((state) => state.controler.show_add_tables);
  const showModalQR = useSelector((state) => state.controler.show_modal_QR_Img);
  const userDomain = useSelector((state) => state.controler.user_domain);
  const spinnerQR = useSelector((state) => state.controler.show_spinner_qr);
  const fallQR = useSelector((state) => state.controler.show_fall_qr);

  const showDeleteTable = useSelector(
    (state) => state.controler.show_delete_table
  );

  const userLang = useSelector(
    (state) => state.controler.user_first_language
  ).toLowerCase();

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const URL = `http://${serverAPI}/api/v1/table/qr/${userDomain}`;

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const request = await axios.get(
        `http://${serverAPI}/api/v1/table/owner_table`,
        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
          headers: { accept: "application/json" },
        }
      );

      if (mounted) {
        dispatch(controlActions.getUserQRCodes(request.data));
        changeLanguage(userLang);
      }
    };

    getData();
  }, []);

  const activateOrDeactivateOrder = (IdQR) => {
    axios
      .post(
        `http://${serverAPI}/api/v1/table/table_order/${IdQR}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        navigate(0);
      });
  };

  const activateOrDeactivateWaiter = (IdQR) => {
    axios
      .post(
        `http://${serverAPI}/api/v1/table/table_garson/${IdQR}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        navigate(0);
      });
  };

  const activateOrDeactivateTable = (IdQR) => {
    axios
      .post(
        `http://${serverAPI}/api/v1/table/table_active_or_deactive/${IdQR}`,
        {},

        {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        navigate(0);
      });
  };

  const displayShowAddQR = (tableID, tableDescriptionValue) => {
    dispatch(controlActions.setTableDescriptionValue(tableDescriptionValue));
    dispatch(controlActions.getUserIdQR(tableID));
    dispatch(controlActions.toggleAddTableQR());
  };

  const displayAddTables = () => {
    dispatch(controlActions.toggleAddTables());
  };

  const displayModalImgQR = (clickedImgQR) => {
    dispatch(controlActions.getUserBigImgQR(clickedImgQR));
    dispatch(controlActions.toggleModalImgQR());
  };

  const displayDeleteTable = (tableID) => {
    dispatch(controlActions.toggleDeleteTable(tableID));
    dispatch(controlActions.getDeleteSomething(t("justTable")));
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };
  return (
    <React.Fragment>
      <section>
        {fallQR && <FallMessage />}
        {spinnerQR && <LoadingSpinner2 />}
        {showModalQR && <ModalImgQR />}
        {showTableQR && <AddTableQR />}
        {showTables && <AddTables />}
        {showDeleteTable && <DeleteOptionalModal />}
        <SideNavigation />
        <div className={classes.contentBigBox}>
          <UpNavigation />
        </div>
        <main className={classes.mainContiner}>
          <div className={classes.headingBtnArea}>
            <div className={classes.headingBackArea}>
              <img
                onClick={goPageBack}
                src={ArrowBack}
                alt="icon"
                className={classes.arrowBack}
              />
              <h1 className={classes.settingsHeading}>{t("QRcodesNav")}</h1>
            </div>
            <button
              onClick={displayAddTables}
              type="button"
              className={classes.addTableBtn}
            >
              <img src={QRbtnIcon} alt="btn" className={classes.qrBtnIcon} />
              {t("addTables")}
            </button>
          </div>

          {userQRCodes.length <= 0 ? (
            <div className={classes.emptyMsgInnerHeading}>
              <h1 className={classes.emptyMsgHomePage}>{t("emptyQRCodes")}</h1>
            </div>
          ) : (
            <div className={classes.qrBigBox}>
              {userQRCodes.map((ele) => (
                <div key={ele.id} className={classes.wholeQR}>
                  <div className={classes.tableDescrioArea}>
                    <span className={classes.tableDescription}>
                      {ele.description}
                    </span>

                    <div className={classes.qrPageTwoBtnBoxy}>
                      <button
                        onClick={() =>
                          displayShowAddQR(ele.id, ele.description)
                        }
                        className={classes.editWholeThingBtn}
                      >
                        <img
                          className={classes.actionPenIcon}
                          alt="icon"
                          src={actionPen}
                        />
                      </button>

                      <button
                        onClick={() => displayDeleteTable(ele.id)}
                        className={classes.deleteWholeThingBtn}
                      >
                        <img
                          className={classes.actionPenIcon}
                          alt="icon"
                          src={actionBin}
                        />
                      </button>
                    </div>
                  </div>
                  <div className={classes.optionsQRArea}>
                    <div className={classes.optionsBox}>
                      <div className={classes.wholeOption}>
                        <span className={classes.optionText}>
                          {t("orderfromTable")}
                        </span>
                        <button
                          onClick={() => activateOrDeactivateOrder(ele.id)}
                          className={
                            ele.order_call
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {ele.order_call ? t("active") : t("notActive")}
                        </button>
                      </div>
                      <div className={classes.wholeOption}>
                        <span className={classes.optionText}>
                          {t("waiterNav")}
                        </span>
                        <button
                          onClick={() => activateOrDeactivateWaiter(ele.id)}
                          className={
                            ele.garson_call
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {ele.garson_call ? t("active") : t("notActive")}
                        </button>
                      </div>
                      <div className={classes.wholeOption}>
                        <span className={classes.optionText}>
                          {t("activeTable")}
                        </span>
                        <button
                          onClick={() => activateOrDeactivateTable(ele.id)}
                          className={
                            ele.is_active
                              ? classes.activeMenu
                              : classes.notActiveMenu
                          }
                          type="button"
                        >
                          {ele.is_active ? t("active") : t("notActive")}
                        </button>
                      </div>
                    </div>
                    <div className={classes.justAreaQR}>
                      <div
                        style={{
                          backgroundImage: `url("${URL}/${ele.qr_code}")`,
                        }}
                        className={classes.imgSmallQR}
                      ></div>
                      <div className={classes.actionQRArea}>
                        <img
                          onClick={() => displayModalImgQR(ele.qr_code)}
                          src={eyeIcon}
                          alt="icon"
                          className={classes.actionQRicons}
                        />
                        <img
                          src={downlodIcon}
                          alt="icon"
                          className={classes.actionQRicons}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(QRcodesPage);
