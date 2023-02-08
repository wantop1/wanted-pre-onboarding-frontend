import classes from "./TodoItem.module.css";
const TodoItem = (props) => {
  return (
    <li>
      <label>
        <input type="checkbox" defaultChecked={props.isCompleted} />
        <span className={`${props.isCompleted ? classes.checked : ""}`}>
          {props.todo}
        </span>
      </label>
    </li>
  );
};

export default TodoItem;
