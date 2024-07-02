/* eslint-disable react/prop-types */

import { format } from "date-fns";

const TodoList = ({ todos }) => {
  return (
    <div>
      <h2>할 일 목록</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo.text}</span> -{" "}
            <span>{format(new Date(todo.time), "p")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
