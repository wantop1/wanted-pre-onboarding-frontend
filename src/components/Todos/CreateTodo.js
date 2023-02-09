import { useState } from "react";
import LoadingSpinner from "../UI/Progress/LodingSpinner";
import MainInput from "../UI/Input/MainInput";
import MainButton from "../UI/Button/MainButton";
import useHttp from "../../hooks/use-http";

const REQUEST_URL = "https://pre-onboarding-selection-task.shop";
const CreateTodo = () => {
  const token = localStorage.getItem("token");
  const { isLoading, error, sendRequest: postTodo } = useHttp();
  const [enteredTodo, setEnterdTodo] = useState("");

  const enteredTodoChangeHandler = (event) => {
    setEnterdTodo(event.target.value);
  };

  const addTodoHandler = async () => {
    postTodo({
      url: `${REQUEST_URL}/todos`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: { todo: enteredTodo },
    });

    setEnterdTodo("");
  };
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <MainInput
        value={enteredTodo}
        type="text"
        id="add-todo-input"
        htmlFor="add-todo-input"
        labelName="add todo"
        onChange={enteredTodoChangeHandler}
        dataTestid="new-todo-input"
        inline={true}
      />
      <MainButton
        width="small"
        onClick={addTodoHandler}
        dataTestid="new-todo-add-button"
      >
        추가
      </MainButton>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateTodo;
