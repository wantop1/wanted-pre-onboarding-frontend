import { useState } from "react";
import classes from "./TodoItem.module.css";
const REQUEST_URL = "https://pre-onboarding-selection-task.shop";
const TodoItem = (props) => {
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(props.isCompleted);
  const [error, setError] = useState();
  const checkboxHandler = async () => {
    setError(null);

    try {
      const response = await fetch(`${REQUEST_URL}/todos/${props.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "isCompleted": !checked, "todo": props.todo }),
      });

      if (!response.ok) {
        throw new Error("modify todo check failed!");
      }
    } catch (error) {
      setError(error.message);
      return;
    }

    setChecked(!checked);
  };
  return (
    <li>
      <label>
        <input onChange={checkboxHandler} type="checkbox" checked={checked} />
          {props.todo}
        <span className={`${checked ? classes.checked : ""}`}>
        </span>
      </label>
      <p>{error}</p>
    </li>
  );
};

export default TodoItem;
