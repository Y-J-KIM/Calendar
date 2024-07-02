import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import format from "date-fns/format";

import "./App.css";
const saveTodos = localStorage.getItem("todos");

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState(JSON.parse(saveTodos) || []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTodo = (text) => {
    const newTodo = {
      text: text,
      time: selectedDate, // 여기에서 선택된 날짜를 그대로 사용
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (todo) => {
    const updatedTodos = todos.filter((item) => item !== todo);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="calendar-container">
        <Calendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          todos={todos}
        />
      </div>
      <div className="todo-container">
        <div className="add-todo-container">
          <h2>할 일 추가</h2>
          <AddTodo onAddTodo={handleAddTodo} />
        </div>
        <h2>{format(selectedDate, "yyyy-MM-dd")}</h2>
        <div className="todo-list-container">
          <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
