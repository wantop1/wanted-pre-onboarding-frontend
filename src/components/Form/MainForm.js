import classes from "./MainForm.module.css";
const MainForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={classes.form}>
      {props.children}
    </form>
  );
};

export default MainForm;
