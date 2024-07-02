/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddTodo.css";

const AddTodo = ({ onAddTodo }) => {
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState("todo");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // 선택한 날짜 출력
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("할 일을 입력하세요.");
      return;
    }
    onAddTodo({
      text: input,
      time: selectedDate,
      status: status,
    });
    setInput("");
    // 선택된 날짜와 색상은 초기화하지 않음
    setSelectedDate(new Date());
    setStatus("todo");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="할 일을 입력하세요"
        className="todo-input"
      />
      <div className="todo-input2">
        <select
          value={status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="todo">할 일</option>
          <option value="doing">진행중</option>
          <option value="done">완료</option>
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="시간"
          dateFormat="YYYY-MM-dd h:mm aa"
          className="datepicker"
          popperPlacement="bottom"
          placeholderText="시간을 선택해주세요"
        />

        <button type="submit" className="add-button">
          추가
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
