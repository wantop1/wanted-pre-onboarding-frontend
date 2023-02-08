import classes from "./MainButton.module.css";
import React from "react";

const MainButton = (props) => {
  return (
    <button
      onClick = {props.onClick}
      disabled={props.disabled}
      className={`${classes.button} ${
        props.width === "small" ? classes.small : ""
      }`}
      data-testid={props.dataTestid}
    >
      {props.children}
    </button>
  );
};

export default MainButton;
