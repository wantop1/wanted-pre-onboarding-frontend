import { useState } from "react";
import MainButton from "../UI/Button/MainButton";
import classes from "./TodoItem.module.css";
const REQUEST_URL = "https://pre-onboarding-selection-task.shop";
const TodoItem = (props) => {
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(props.isCompleted);
  const [error, setError] = useState();
  const [editable, setEditable] = useState(false);
  const [todo, setTodo] = useState(props.todo);

  const editTodoHandler = () => {
    if(editable) {
      setChecked(props.isCompleted);
      setTodo(props.todo);
    }

    setEditable(!editable);

  };

  const checkboxHandler = () => {
    if (!editable) {
      return;
    }
    setChecked(!checked);
  };

  const enteredTodoHandler = (event) => {
    setTodo(event.target.value);
  };

  const deleteTodoHandler = async () => {
    setError(null);

    try {
      const response = await fetch(`${REQUEST_URL}/todo/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("delete todo failed!");
      }
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  const modifyTodohandler = async () => {

    setError(null);
    console.log()

    try {
      const response = await fetch(`${REQUEST_URL}/todos/${props.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "isCompleted": checked, "todo": todo }),
      });

      if (!response.ok) {
        throw new Error("modify todo failed!");
      }
    } catch (error) {
      setError(error.message);
      return;
    }
  };
  return (
    <li>
      <label>
        <input onChange={checkboxHandler} type="checkbox" checked={checked} />
        {editable ? (
          <input
            onChange={enteredTodoHandler}
            data-testid="modify-input"
            value={todo}
          />
        ) : (
          <span className={`${checked ? classes.checked : ""}`}>
            {props.todo}
          </span>
        )}
      </label>

      {editable ? (
        <MainButton
          onClick={editTodoHandler}
          width="small"
          dataTestid="cancel-button"
        >
          취소
        </MainButton>
      ) : (
        <MainButton
          onClick={editTodoHandler}
          width="small"
          dataTestid="modify-button"
        >
          수정
        </MainButton>
      )}

      {editable ? (
        <MainButton
          onClick={modifyTodohandler}
          width="small"
          dataTestid="submit-button"
        >
          제출
        </MainButton>
      ) : (
        <MainButton
          onClick={deleteTodoHandler}
          width="small"
          dataTestid="delete-button"
        >
          삭제
        </MainButton>
      )}

      <p>{error}</p>
    </li>
  );
};

export default TodoItem;
