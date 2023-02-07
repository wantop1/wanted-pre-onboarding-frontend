import classes from "./MainButton.module.css";
import React from "react";

const MainButton = (props) => {
  return <button disabled={props.disabled} className={classes.button}>{props.children}</button>
};

export default MainButton;
