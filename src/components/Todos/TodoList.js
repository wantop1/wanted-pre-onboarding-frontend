import { useState, useEffect } from "react";
import TodoItem from "../Todos/TodoItem";
import Card from "../UI/Card/Card";
import LoadingSpinner from "../UI/Progress/LodingSpinner";

const REQUEST_URL = "https://pre-onboarding-selection-task.shop";

const TodoList = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const response = await fetch(`${REQUEST_URL}/todos`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (!response.ok) {
        throw new Error("Can not load todo list!");
      }
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    };
    fetchTodos().catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [token]);

  const todoList = todos.map((item) => (
    <TodoItem
      key={item.id}
      id={item.id}
      todo={item.todo}
      isCompleted={item.isCompleted}
    />
  ));

  return (
    <section>
      <Card>
        {loading && <LoadingSpinner />}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && <ul>{todoList}</ul>}
      </Card>
    </section>
  );
};

export default TodoList;
