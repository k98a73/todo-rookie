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
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const filterOptions = [
    { label: "notStarted", value: "未着手" },
    { label: "inProgress", value: "作業中" },
    { label: "done", value: "完了" },
  ];
  const [todoStatus, setTodoStatus] = useState("未着手");

  const today = new Date();
  const [dueDate, setDueDate] = useState(today);
  registerLocale("ja", ja);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleEditDatePickerChange = (selectedDate) => {
    setCurrentTodo({ ...currentTodo, date: selectedDate });
  };

  const handleSelectChange = (e) => {
    setCurrentTodo({ ...currentTodo, status: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          status: todoStatus,
          date: dueDate,
        },
      ]);
    }
    setTodo("");
    setDueDate(today);
    setTodoStatus("未着手");
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
    setTodo("");
    setDueDate(today);
    setTodoStatus("未着手");
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  return (
    <>
      <h1 className="title">TODOリスト</h1>
      {isEditing ? (
        <>
          <div className="header-title">TODOの編集</div>
          <form className="input-area" onSubmit={handleEditFormSubmit}>
            <p>id: {currentTodo.id} TODO：</p>
            <input
              name="editTodo"
              type="text"
              placeholder="Edit todo"
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />
            <p>期限：</p>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale="ja"
              selected={currentTodo.date}
              minDate={today}
              onChange={handleEditDatePickerChange}
            />
            <select onChange={handleSelectChange}>
              {filterOptions.map(({ value, label }) => (
                <option
                  key={label}
                  value={value}
                  selected={value === currentTodo.status}
                >
                  {value}
                </option>
              ))}
            </select>
            <button type="submit">更新</button>
            <button onClick={() => setIsEditing(false)}>キャンセル</button>
          </form>
        </>
      ) : (
        <>
          <div className="header-title">TODOの追加</div>
          <form className="input-area" onSubmit={handleFormSubmit}>
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
            <select onChange={(e) => setTodoStatus(e.target.value)}>
              {filterOptions.map(({ value, label }) => (
                <option key={label} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button type="submit">追加</button>
          </form>
          <div className="todo-area">
            <ul>
              {todos.map((todo) => {
                return (
                  <li key={todo.id}>
                    <div className="list-row">
                      <p>id: {todo.id}</p>
                      <p>TODO: {todo.text}</p>
                      <p>
                        期限:
                        {todo.date?.getFullYear() +
                          "/" +
                          (todo.date?.getMonth() + 1) +
                          "/" +
                          todo.date?.getDate()}
                      </p>
                      <p> 状況: {todo.status}</p>
                      <button onClick={() => handleEditClick(todo)}>
                        編集
                      </button>
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
      )}
    </>
  );
};

export default App;
