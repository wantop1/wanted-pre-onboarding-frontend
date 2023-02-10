import { useState } from "react";
import MainButton from "../UI/Button/MainButton";
import classes from "./TodoItem.module.css";
import useHttp from "../../hooks/use-http";
import { REQUEST_URL } from "../../constants/paths";

const TodoItem = ({ id, todo, isCompleted, setTodos }) => {
  const token = localStorage.getItem("token");
  const { error: deleteTodoError, sendRequest: deleteTodo } = useHttp();
  const { error: putTodoError, sendRequest: putToto } = useHttp();

  const [checked, setChecked] = useState(isCompleted);
  const [editable, setEditable] = useState(false);
  const [enteredTodo, setEnteredTodo] = useState(todo);

  const editHandler = () => {
    if (editable) {
      setChecked(isCompleted);
      setEnteredTodo(todo);
    }

    setEditable((editableState)=>!editableState);
  };

  const checkboxHandler = () => {
    if (!editable) {
      return;
    }
    setChecked(!checked);
  };

  const enteredTodoHandler = (event) => {
    setEnteredTodo(event.target.value);
  };

  const removeTodoItem = (id) => {
    setTodos((prevList) => prevList.filter((item) => item.id !== id));
  };

  const modifyTodoItem = (id, data) => {
    setTodos((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {...item,isCompleted: data.isCompleted, todo: data.todo }
          : item
      )
    );

    setEditable((editableState)=>!editableState);
  };

  const deleteTodoHandler = async () => {
    deleteTodo(
      {
        url: `${REQUEST_URL}/todos/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      removeTodoItem,
      id
    );
  };

  const modifyTodohandler = async () => {
    putToto(
      {
        url: `${REQUEST_URL}/todos/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: { isCompleted: checked, todo: enteredTodo },
      },
      modifyTodoItem,
      id
    );
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
            value={enteredTodo}
          />
        ) : (
          <span className={`${checked ? classes.checked : ""}`}>
            {enteredTodo}
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
