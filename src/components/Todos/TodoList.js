import TodoItem from "../Todos/TodoItem";
import Card from "../UI/Card/Card";
import LoadingSpinner from "../UI/Progress/LodingSpinner";

const TodoList = ({todos, error, isLoading}) => {
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
        {isLoading && <LoadingSpinner />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && <ul>{todoList}</ul>}
      </Card>
    </section>
  );
};

export default TodoList;
