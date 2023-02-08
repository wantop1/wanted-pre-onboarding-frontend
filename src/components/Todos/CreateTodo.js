import { useState } from "react";
import LoadingSpinner from "../UI/Progress/LodingSpinner";
import MainInput from "../UI/Input/MainInput";
import MainButton from "../UI/Button/MainButton";

const REQUEST_URL = "https://pre-onboarding-selection-task.shop";
const CreateTodo = () => {
  const token = localStorage.getItem("token");
  const [enteredTodo, setEnterdTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const enteredTodoChangeHandler = (event) => {
    setEnterdTodo(event.target.value);
  };

  const addTodoHandler = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${REQUEST_URL}/todos`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: enteredTodo }),
      });

      if (!response.ok) {
        throw new Error("Can not add todo!");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

    setLoading(false);
    setEnterdTodo("");
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <MainInput
        value={enteredTodo}
        type="text"
        id="add-todo-input"
        htmlFor="add-todo-input"
        labelName="add todo"
        onChange={enteredTodoChangeHandler}
        dataTestid="new-todo-input"
        inline ={true}
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
