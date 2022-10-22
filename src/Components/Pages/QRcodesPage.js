import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import PenIcon from "../Icons/Pen.svg";
import axios from "axios";
import eyeIcon from "../Icons/eyeIcon.svg";
import downlodIcon from "../Icons/downlodIcon.svg";
import QRbtnIcon from "../Icons/QRbtn.svg";
import SideNavigation from "../UI-Components/SideNavigation";
import UpNavigation from "../UI-Components/UpNavigation";
import AddTableQR from "../UI-Components/AddTableQR";
import AddTables from "../UI-Components/AddTables";
import ModalImgQR from "../UI-Components/ModaImgQR";
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

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };
  return (
    <React.Fragment>
      <section>
        {showModalQR && <ModalImgQR />}
        {showTableQR && <AddTableQR />}
        {showTables && <AddTables />}
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
              <h1 className={classes.settingsHeading}>QR коды</h1>
            </div>
            <button
              onClick={displayAddTables}
              type="button"
              className={classes.addTableBtn}
            >
              <img src={QRbtnIcon} alt="btn" className={classes.qrBtnIcon} />
              Добавить столы
            </button>
          </div>

          <div className={classes.qrBigBox}>
            {userQRCodes.map((ele) => (
              <div key={ele.id} className={classes.wholeQR}>
                <div className={classes.tableDescrioArea}>
                  <span className={classes.tableDescription}>
                    {ele.description}
                    <button
                      onClick={() => displayShowAddQR(ele.id, ele.description)}
                      className={classes.editDescripBtn}
                    >
                      <img
                        src={PenIcon}
                        alt="icon"
                        className={classes.penIcon}
                      />
                    </button>
                  </span>
                </div>
                <div className={classes.optionsQRArea}>
                  <div className={classes.optionsBox}>
                    <div className={classes.wholeOption}>
                      <span className={classes.optionText}>Заказ от стола</span>
                      <button
                        onClick={() => activateOrDeactivateOrder(ele.id)}
                        className={
                          ele.order_call
                            ? classes.activeMenu
                            : classes.notActiveMenu
                        }
                        type="button"
                      >
                        {ele.order_call ? "Активный" : "Неактивный"}
                      </button>
                    </div>
                    <div className={classes.wholeOption}>
                      <span className={classes.optionText}>
                        Вызов официанта
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
                        {ele.garson_call ? "Активный" : "Неактивный"}
                      </button>
                    </div>
                    <div className={classes.wholeOption}>
                      <span className={classes.optionText}>Активный стол</span>
                      <button
                        onClick={() => activateOrDeactivateTable(ele.id)}
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
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(QRcodesPage);
