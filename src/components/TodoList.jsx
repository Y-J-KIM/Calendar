/* eslint-disable react/prop-types */
import { format } from "date-fns";
import "./TodoList.css";

const TodoList = ({ todos, onDeleteTodo }) => {
  const handleDelete = (todo) => {
    onDeleteTodo(todo);
  };

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div className="todo-item" key={index}>
          <div className="todo-text">
            {format(todo.time, "HH:mm")} - <strong>{todo.text}</strong>
          </div>
          <button onClick={() => handleDelete(todo)} className="delete-button">
            삭제
          </button>
        </div>
      ))}
      {todos.length === 0 && <p>할 일이 없습니다.</p>}
    </div>
  );
};

export default TodoList;
