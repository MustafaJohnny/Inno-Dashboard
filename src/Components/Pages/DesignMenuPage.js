import React from "react";
import ArrowBack from "../Icons/ArrowBack.svg";
import FirstMenu1 from "../Images/FirstMenu1.png";
import FirstMenu2 from "../Images/FirstMenu2.png";
import FirstMenu3 from "../Images/FirstMenu3.png";
import SecondMenu1 from "../Images/SecondMenu1.png";
import SecondMenu2 from "../Images/SecondMenu2.png";
import SecondMenu3 from "../Images/SecondMenu3.png";
import ThirdMenu1 from "../Images/ThirdMenu1.jpg";
import ThirdMenu2 from "../Images/ThirdMenu2.jpg";
import ThirdMenu3 from "../Images/ThirdMenu3.jpg";
import ForthMenu1 from "../Images/ForthMenu1.jpg";
import ForthMenu2 from "../Images/ForthMenu2.jpg";
import ForthMenu3 from "../Images/ForthMenu3.jpg";
import FifthMenu1 from "../Images/FifthMenu1.jpg";
import FifthMenu2 from "../Images/FifthMenu2.jpg";
import FifthMenu3 from "../Images/FifthMenu3.jpg";
import { useTranslation } from "react-i18next";
import SideNavigation from "../UI-Components/SideNavigation";
import ConfirmDesign from "../UI-Components/ConfirmDesign";
import UpNavigation from "../UI-Components/UpNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useEffect } from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";

const DesignMenuPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showConfirmDesign = useSelector(
    (state) => state.controler.show_confirm_design
  );

  const currentDesignNum = useSelector(
    (state) => state.controler.user_design_number
  );

  const userLanguage = useSelector(
    (state) => state.controler.user_first_language
  );

  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(userLanguage.toLowerCase());
  }, []);

  const getDesignNumber = (event) => {
    const designNumber = event.target.value;
    dispatch(controlActions.setWantedDesignNumber(designNumber));
    dispatch(controlActions.toggleConfirmDesign());
  };

  const goPageBack = () => {
    navigate(-1, {
      replace: false,
    });
  };

  return (
    <React.Fragment>
      <section>
        {showConfirmDesign && <ConfirmDesign />}
        <main className={classes.mainContiner}>
          <SideNavigation />
          <div className={classes.contentBigBox}>
            <UpNavigation />
            <main className={classes.designContainer}>
              <div className={classes.managementBtnsArea}>
                <div className={classes.headArrowArea}>
                  <img
                    onClick={goPageBack}
                    src={ArrowBack}
                    alt="icon"
                    className={classes.arrowBack}
                  />
                  <h1
                    className={`${classes.managementHeading} ${classes.designjsHeading}`}
                  >
                    {t("yourMenu")}: {t("justMenu")} {currentDesignNum}
                  </h1>
                </div>
              </div>

              <div className={classes.designMenusContainer}>
                <div className={classes.wholeDesginMenuBox}>
                  <h1 className={classes.desginMenuHeading}>
                    {t("justMenu")} 1
                  </h1>
                  <div className={classes.selectInputArea}>
                    <input
                      className={classes.radioStyle}
                      onChange={getDesignNumber}
                      name="Design"
                      value="1"
                      type="radio"
                      id="menu1"
                    />
                    <label className={classes.lablesDesigns} htmlFor="menu1">
                      {t("choseMenu")}
                    </label>
                  </div>

                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className={classes.desginSwiper}
                  >
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FirstMenu1}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FirstMenu2}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FirstMenu3}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className={classes.wholeDesginMenuBox}>
                  <h1 className={classes.desginMenuHeading}>
                    {t("justMenu")} 2
                  </h1>
                  <div className={classes.selectInputArea}>
                    <input
                      className={classes.radioStyle}
                      onChange={getDesignNumber}
                      name="Design"
                      value="2"
                      type="radio"
                      id="menu2"
                    />
                    <label className={classes.lablesDesigns} htmlFor="menu2">
                      {t("choseMenu")}
                    </label>
                  </div>

                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className={classes.desginSwiper}
                  >
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={SecondMenu1}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={SecondMenu2}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={SecondMenu3}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className={classes.wholeDesginMenuBox}>
                  <h1 className={classes.desginMenuHeading}>
                    {t("justMenu")} 3
                  </h1>
                  <div className={classes.selectInputArea}>
                    <input
                      className={classes.radioStyle}
                      onChange={getDesignNumber}
                      name="Design"
                      value="3"
                      type="radio"
                      id="menu3"
                    />
                    <label className={classes.lablesDesigns} htmlFor="menu3">
                      {t("choseMenu")}
                    </label>
                  </div>

                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className={classes.desginSwiper}
                  >
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ThirdMenu1}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ThirdMenu2}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ThirdMenu3}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className={classes.wholeDesginMenuBox}>
                  <h1 className={classes.desginMenuHeading}>
                    {t("justMenu")} 4
                  </h1>
                  <div className={classes.selectInputArea}>
                    <input
                      className={classes.radioStyle}
                      onChange={getDesignNumber}
                      name="Design"
                      value="4"
                      type="radio"
                      id="menu4"
                    />
                    <label className={classes.lablesDesigns} htmlFor="menu4">
                      {t("choseMenu")}
                    </label>
                  </div>

                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className={classes.desginSwiper}
                  >
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ForthMenu1}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ForthMenu2}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={ForthMenu3}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className={classes.wholeDesginMenuBox}>
                  <h1 className={classes.desginMenuHeading}>
                    {t("justMenu")} 5
                  </h1>
                  <div className={classes.selectInputArea}>
                    <input
                      className={classes.radioStyle}
                      onChange={getDesignNumber}
                      name="Design"
                      value="5"
                      type="radio"
                      id="menu5"
                    />
                    <label className={classes.lablesDesigns} htmlFor="menu5">
                      {t("choseMenu")}
                    </label>
                  </div>

                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className={classes.desginSwiper}
                  >
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FifthMenu1}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FifthMenu2}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                    <SwiperSlide className={classes.designSlide}>
                      <img
                        src={FifthMenu3}
                        alt="img"
                        className={classes.designImg}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </main>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default React.memo(DesignMenuPage);
