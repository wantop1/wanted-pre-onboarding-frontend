import classes from "./MainInput.module.css";
const MainInput = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.htmlFor}>{props.labelName}</label>
      <input onChange={props.onChange} data-testid={props.dataTestid} type={props.type} id={props.id} value={props.value}/>
    </div>
  );
};

export default MainInput;
