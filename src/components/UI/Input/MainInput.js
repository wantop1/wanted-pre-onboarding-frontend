import classes from "./MainInput.module.css";
const MainInput = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.htmlFor}>{props.labelName}</label>
      <input
        onBlur={props.onBlur}
        onChange={props.onChange}
        data-testid={props.dataTestid}
        type={props.type}
        id={props.id}
        value={props.value}
      />
      {props.error && <p>{props.errorMessage}</p>}
    </div>
  );
};

export default MainInput;
