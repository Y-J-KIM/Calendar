import { useState } from "react";
import "./App.css";
import { format } from "date-fns";
import Calendar from "./components/Calendar";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTodo = (todo) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    setTodos((prevTodos) => ({
      ...prevTodos,
      [dateKey]: [...App(prevTodos[dateKey] || []), todo],
    }));
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const todosForSelectedDate = todos[dateKey] || [];

  return (
    <div>
      <h1>나의 달력</h1>
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <h2>선택된 날짜: {dateKey}</h2>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todosForSelectedDate} />
    </div>
  );
};

export default App;
