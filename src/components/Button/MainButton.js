import classes from "./MainButton.module.css";
const MainButton = (props) => {
  return <div>
      <button className={classes.button}>{props.children}</button>
  </div>
};

export default MainButton;
