import classes from "./LoadingSpinner.module.css";
import Overlay from "./Overlay";
import React from "react";

const LoadingSpinner = () => {
  return (
    <React.Fragment>
      <div className={classes.spinnerBox}>
        <div className={classes["lds-default"]}>
          <div></div>
          <div></div>
        </div>
        <h3 className={classes.message}>Осуществляется перевод...</h3>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
