/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddTodo.css";

const AddTodo = ({ onAddTodo }) => {
  const [input, setInput] = useState("");
  const [selectedTime, setSelectedTime] = useState(null); // 초기값은 null로 설정

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedTime(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("시간을 선택해주세요.");
      return;
    }
    onAddTodo({
      text: input,
      time: selectedTime,
    });
    setInput("");
    setSelectedTime(null);
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
      <DatePicker
        selected={selectedTime}
        onChange={handleDateChange}
        showTimeSelect
        showTimeSelectOnly // 시간 선택 창만 표시
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="시간"
        dateFormat="h:mm aa"
        className="datepicker"
        popperPlacement="bottom"
        placeholderText="시간을 선택해주세요"
      />
      <button type="submit" className="add-button">
        추가
      </button>
    </form>
  );
};

export default AddTodo;
