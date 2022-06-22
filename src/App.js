import { useState } from "react";
import "./reset.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const filterOptions = [
    { value: "all", label: "すべて" },
    { value: "notStarted", label: "未着手" },
    { value: "inProgress", label: "作業中" },
    { value: "done", label: "完了" },
  ];

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  };

  return (
    <>
      <div className="header-title">TODOリスト</div>
      <form className="input-area">
        <input
          name="todo"
          type="text"
          placeholder="TODOを入力"
          value={todo}
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>追加</button>
      </form>
      <div className="todo-area">
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <div className="list-row">
                  <p>
                    id:{todo.id} {todo.text}
                  </p>
                  <select>
                    {filterOptions.map(({ value, label }) => (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
