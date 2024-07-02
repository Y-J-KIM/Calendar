/* eslint-disable react/prop-types */

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import "./Calendar.css";

const Calendar = ({ selectedDate, onDateChange, todos }) => {
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            ◀
          </div>
        </div>
        <div className="col col-center">
          <span>{format(selectedDate, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">▶</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(selectedDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`col col-center ${i === 0 ? "sunday" : ""}`} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            } ${getDay(day) === 0 ? "sunday" : ""}`} // 일요일인 경우 'sunday' 클래스 추가
            key={day}
            onClick={() => onDateChange(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div className="todos">
              {hasTodosForDate(day) && <div className="dot" />}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    onDateChange(addMonths(selectedDate, 1));
  };

  const prevMonth = () => {
    onDateChange(subMonths(selectedDate, 1));
  };

  const hasTodosForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return todos.some(
      (todo) => format(new Date(todo.time), "yyyy-MM-dd") === formattedDate
    );
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
