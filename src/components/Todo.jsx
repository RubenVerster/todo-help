const Todo = ({ todo, setTodos, todos }) => {
  const deleteTodo = (todo) => {
    setTodos(todos.filter((t) => t.name !== todo.name));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((t) => t.name !== todo.name))
    );
  };

  const handleChecked = (todo) => {
    const newTodos = todos.map((t) => {
      if (t.name === todo.name) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  return (
    <li className="todo__list_item" key={todo.name}>
      <span
        onClick={() => handleChecked(todo)}
        className={`todo__list_item-name ${
          todo.completed === true ? "completed" : ""
        }`}
      >
        {todo.name}
      </span>
      <button
        className="todo__list_item-button"
        onClick={() => deleteTodo(todo)}
      >
        X
      </button>
    </li>
  );
};

export default Todo;
