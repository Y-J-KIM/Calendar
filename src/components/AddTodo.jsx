/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddTodo.css";

const AddTodo = ({ onAddTodo }) => {
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState("#dc3545"); // 기본 색상: 빨강

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
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
      color: selectedColor,
    });
    setInput("");
    // 선택된 날짜와 색상은 초기화하지 않음
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
        selected={selectedDate}
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
      <div className="color-selector">
        <button
          className="color-button red"
          style={{ backgroundColor: "#dc3545" }}
          onClick={() => handleColorChange("#dc3545")}
        />
        <button
          className="color-button blue"
          style={{ backgroundColor: "#007bff" }}
          onClick={() => handleColorChange("#007bff")}
        />
        <button
          className="color-button green"
          style={{ backgroundColor: "#28a745" }}
          onClick={() => handleColorChange("#28a745")}
        />
      </div>
      <button type="submit" className="add-button">
        추가
      </button>
    </form>
  );
};

export default AddTodo;
