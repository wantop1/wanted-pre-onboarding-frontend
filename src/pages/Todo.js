import { useState, useEffect } from "react";
import CreateTodo from "../components/Todos/CreateTodo";
import TodoList from "../components/Todos/TodoList";
import useHttp from "../hooks/use-http";
import { REQUEST_URL } from "../constants/paths";

const Todo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const { isLoading, error, sendRequest: fetchTodos } = useHttp();

  useEffect(() => {
    fetchTodos(
      {
        url: `${REQUEST_URL}/todos`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      setTodos
    );
  }, [fetchTodos, token]);

  return (
    <>
      <CreateTodo setTodos={setTodos}/>
      <TodoList todos={todos} setTodos={setTodos} error={error} isLoading={isLoading} />
    </>
  );
};

export default Todo;
