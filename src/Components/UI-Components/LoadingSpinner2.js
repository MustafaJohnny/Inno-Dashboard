import classes from "./LoadingSpinner2.module.css";
import React from "react";

const LoadingSpinner2 = () => {
  return (
    <React.Fragment>
      <div className={classes.spinnerBox}>
        <h3 className={classes.message}>Пожалуйста Подождите...</h3>
        <div className={classes["lds-default"]}>
          <div></div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner2;
