/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";
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
  addYears,
  subYears,
} from "date-fns";
import "./Calendar.css";

const Calendar = ({ selectedDate, onDateChange, todos }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const apiKey =
          "5KHus0kZumU6xCHfjis0C7ZPb6CqC5h9fm9c6OTiHusVzrPiYeW3HzJBbHrrKWlkn8SVi6d4G0D1aWaEEkeLsA%3D%3D"; // 발급받은 API Key
        const year = selectedDate.getFullYear(); // 선택된 연도를 가져옵니다
        const month = format(selectedDate, "MM"); // 선택된 월을 가져옵니다
        const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${apiKey}&solYear=${year}&solMonth=${month}`;

        const response = await axios.get(url);

        const holidaysData = response.data.response.body.items.item;

        if (holidaysData) {
          setHolidays(
            Array.isArray(holidaysData) ? holidaysData : [holidaysData]
          ); // 공휴일 데이터를 상태에 설정합니다.
        } else {
          setHolidays([]); // holidaysData가 없을 경우 빈 배열로 설정합니다.
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setHolidays([]); // 오류가 발생하면 공휴일 데이터를 비웁니다.
      }
    };

    fetchHolidays();
  }, [selectedDate]); // selectedDate가 변경될 때마다 공휴일을 다시 불러옵니다.

  const renderHeader = () => {
    const dateFormat = "yyyy년 MM월";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevYear}>
            ◁◁
          </div>
          <div className="icon" onClick={prevMonth}>
            ◀
          </div>
        </div>
        <div className="col col-center">
          <span>{format(selectedDate, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={nextMonth}>
            ▶
          </div>
          <div className="icon" onClick={nextYear}>
            ▷▷
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    //const dateFormat = "EEE";
    const days = [];
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    //let startDate = startOfWeek(selectedDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`col col-center ${i === 0 ? "sunday" : ""}`} key={i}>
          {weekdays[i]}
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
        // 공휴일 확인
        const isHoliday = holidays.some(
          (holiday) =>
            holiday.locdate === format(cloneDay, "yyyy-MM-dd") &&
            holiday.isHoliday === "Y"
        );

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
            onClick={() => onDateChange(cloneDay)} // 사용자가 날짜를 클릭하면 onDateChange 함수 호출
          >
            <span className="number">{formattedDate}</span>
            {isHoliday && <div className="holiday-text">공휴일</div>}
            <div className="todos">{renderTodosForDate(day)}</div>
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

  const renderTodosForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const todosForDate = todos.filter(
      (todo) => format(new Date(todo.time), "yyyy-MM-dd") === formattedDate
    );

    const statusOrder = { todo: 1, doing: 2, done: 3 };

    const sortedTodosForDate = todosForDate.sort(
      (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );

    return (
      <>
        {sortedTodosForDate.map((todo, index) => (
          <div
            key={index}
            className="dot"
            style={{ backgroundColor: getTodoColor(todo.status) }}
          ></div>
        ))}
      </>
    );
  };

  const getTodoColor = (status) => {
    switch (status) {
      case "todo":
        return "#f39c12";
      case "doing":
        return "#2ecc71";
      case "done":
        return "#3498db";
    }
  };

  const nextMonth = () => {
    onDateChange(addMonths(selectedDate, 1));
  };

  const prevMonth = () => {
    onDateChange(subMonths(selectedDate, 1));
  };

  const nextYear = () => {
    onDateChange(addYears(selectedDate, 1));
  };

  const prevYear = () => {
    onDateChange(subYears(selectedDate, 1));
  };

  return (
    <div className="calendar_container">
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
