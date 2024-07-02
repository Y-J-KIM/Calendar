import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import format from "date-fns/format";

const saveTodos = localStorage.getItem("todos");

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState(JSON.parse(saveTodos) || []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // 필요에 따라 특정 날짜의 할 일 목록을 필터링하여 반환할 수 있습니다.
  const getTodosForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return todos.filter(
      (todo) => format(new Date(todo.time), "yyyy-MM-dd") === formattedDate
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>나의 달력</h1>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        todos={todos}
      />
      <h2>선택된 날짜: {format(selectedDate, "yyyy-MM-dd")}</h2>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={getTodosForDate(selectedDate)} />
    </div>
  );
};

export default App;
