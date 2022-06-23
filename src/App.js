import { useState } from "react";
// react-datepickerを導入するならターミナルで「npm install react-datepicker --save」を実行
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import "./reset.css";
import "react-datepicker/dist/react-datepicker.css";
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

  const today = new Date();
  const [dueDate, setDueDate] = useState(today);
  registerLocale("ja", ja);

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
          date: dueDate,
        },
      ]);
    }
    setTodo("");
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  return (
    <>
      <div className="header-title">TODOリスト</div>
      <form className="input-area">
        <p>TODO：</p>
        <input
          name="todo"
          type="text"
          placeholder="TODOを入力"
          value={todo}
          onChange={handleInputChange}
        />
        <p>期限：</p>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          locale="ja"
          selected={dueDate}
          minDate={today}
          onChange={(selectedDate) => {
            setDueDate(selectedDate || today);
          }}
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
                    id：{todo.id} TODO：{todo.text} 期限：
                    {todo.date?.getFullYear() +
                      "/" +
                      (todo.date?.getMonth() + 1) +
                      "/" +
                      todo.date?.getDate()}
                  </p>
                  <select>
                    {filterOptions.map(({ value, label }) => (
                      <option key={label} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleDeleteClick(todo.id)}>
                    削除
                  </button>
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
