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

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDeleteTodo = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  const todosForSelectedDate = todos.filter(
    (todo) =>
      format(new Date(todo.time), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  useEffect(() => {
    console.log("todos update:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <h1 className="title">Todo List</h1>
      <div className="calendar-container">
        <Calendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          todos={todos}
        />
      </div>
      <div className="todo-container">
        <div className="app-content">
          <div className="add-todo-container">
            <h2>Todo List 추가</h2>
            <AddTodo onAddTodo={handleAddTodo} />
          </div>
          <h2>{format(selectedDate, "yyyy-MM-dd")}</h2>
          <div className="todo-list-container">
            <TodoList
              todos={todosForSelectedDate}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
