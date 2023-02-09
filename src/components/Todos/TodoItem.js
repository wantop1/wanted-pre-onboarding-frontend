import { useState } from "react";
import MainButton from "../UI/Button/MainButton";
import classes from "./TodoItem.module.css";
import useHttp from "../../hooks/use-http";
const REQUEST_URL = "https://pre-onboarding-selection-task.shop";

const TodoItem = (props) => {
  const token = localStorage.getItem("token");
  const { error: deleteTodoError, sendRequest: deleteTodo } = useHttp();
  const { error: putTodoError, sendRequest: putToto } = useHttp();

  const [checked, setChecked] = useState(props.isCompleted);
  const [editable, setEditable] = useState(false);
  const [todo, setTodo] = useState(props.todo);

  const editHandler = () => {
    if (editable) {
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
    deleteTodo({
      url: `${REQUEST_URL}/todos/${props.id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const modifyTodohandler = async () => {
    putToto({
      url: `${REQUEST_URL}/todos/${props.id}`,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: { isCompleted: checked, todo: todo },
    });
  };

  let firstButton, secondButton;

  if (editable) {
    firstButton = (
      <MainButton
        onClick={editHandler}
        width="small"
        dataTestid="cancel-button"
      >
        취소
      </MainButton>
    );
    secondButton = (
      <MainButton
      onClick={modifyTodohandler}
      width="small"
      dataTestid="submit-button"
    >
      제출
    </MainButton>
    );
  } else {
    firstButton = (
      <MainButton
        onClick={editHandler}
        width="small"
        dataTestid="modify-button"
      >
        수정
      </MainButton>
    );
    secondButton = (
      <MainButton
        onClick={deleteTodoHandler}
        width="small"
        dataTestid="delete-button"
      >
        삭제
      </MainButton>
    );
  }

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
      {firstButton}
      {secondButton}
      <p>{deleteTodoError || putTodoError}</p>
    </li>
  );
};

export default TodoItem;
