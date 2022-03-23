import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const saveTodo = async (e) => {
    e.preventDefault();
    if (todo.length === 0) return;
    const newTodo = { name: todo, completed: false };

    const newTodos = [newTodo, ...todos];

    await setTodos(newTodos);
    await localStorage.setItem('todos', JSON.stringify(newTodos));
    await setTodo('');
  };

  const deleteTodo = (todo) => {
    setTodos(todos.filter((t) => t.name !== todo.name));
    localStorage.setItem(
      'todos',
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
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const renderTodos = () => {
    return todos.map((todo) => {
      return (
        <li className='todo__list_item' key={todo.name}>
          <span
            onClick={() => handleChecked(todo)}
            className={`todo__list_item-name ${
              todo.completed === true ? 'completed' : ''
            }`}
          >
            {todo.name}
          </span>
          <button
            className='todo__list_item-button'
            onClick={() => deleteTodo(todo)}
          >
            X
          </button>
        </li>
      );
    });
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')) ?? []);
  }, []);

  return (
    <div className='container'>
      <h1 className='container__title'>Todos</h1>
      <form className='form' onSubmit={(e) => saveTodo(e)}>
        <div className='controls'>
          <input
            className='form__input'
            value={todo}
            type='text'
            placeholder='I need to do this...'
            onChange={(e) => handleChange(e)}
          />
          <button className='form__button' type='submit'>
            +
          </button>
        </div>
      </form>

      {todos.length > 0 && <ul className='todo__list'>{renderTodos()}</ul>}
    </div>
  );
}

export default App;
