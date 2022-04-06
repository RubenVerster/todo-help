import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const saveTodo = async (e) => {
    e.preventDefault();
    if (todo.length === 0) return;
    const newTodo = { name: todo, completed: false };

    const newTodos = [newTodo, ...todos];

    await setTodos(newTodos);
    await localStorage.setItem("todos", JSON.stringify(newTodos));
    await setTodo("");
  };

  const renderTodos = () => {
    return todos.map((todo) => {
      return <Todo setTodos={setTodos} todos={todos} todo={todo} />;
    });
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) ?? []);
  }, []);

  return (
    <div className="container">
      <h1 className="container__title">Todos</h1>
      <form className="form" onSubmit={(e) => saveTodo(e)}>
        <div className="controls">
          <input
            className="form__input"
            value={todo}
            type="text"
            placeholder="I need to do this..."
            onChange={({ target: { value } }) => setTodo(value)}
          />
          <button className="form__button" type="submit">
            +
          </button>
        </div>
      </form>

      {todos.length > 0 && <ul className="todo__list">{renderTodos()}</ul>}
    </div>
  );
}

export default App;
