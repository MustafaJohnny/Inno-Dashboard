import classes from "./LoadingSpinner2.module.css";
import React from "react";

const LoadingSpinner2 = () => {
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

export default LoadingSpinner2;
