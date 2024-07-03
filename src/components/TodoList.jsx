/* eslint-disable react/prop-types */
import { format } from "date-fns";
import "./TodoList.css";

const TodoList = ({ todos, onDeleteTodo }) => {
  const handleDelete = (todo) => {
    onDeleteTodo(todo);
  };

  const renderTodos = (status) => {
    const filteredTodos = todos
      .filter((todo) => todo.status === status)
      .sort((a, b) => new Date(a.time) - new Date(b.time));
    return filteredTodos.length > 0 ? (
      filteredTodos.map((todo, index) => (
        <div className="todo-item" key={index}>
          <div className="todo-text">
            {format(new Date(todo.time), "HH:mm")} -{" "}
            <strong>{todo.text}</strong>
          </div>
          <button onClick={() => handleDelete(todo)} className="delete-button">
            x
          </button>
        </div>
      ))
    ) : (
      <p className="p1">할 일이 없습니다.</p>
    );
  };

  return (
    <div className="todo-list-container">
      <div className="todo-column">
        <h2>
          <span className="color-block todo"></span>할일
        </h2>
        {renderTodos("todo")}
      </div>
      <div className="todo-column">
        <h2>
          <span className="color-block doing"></span>진행중
        </h2>
        {renderTodos("doing")}
      </div>
      <div className="todo-column">
        <h2>
          <span className="color-block done"></span>완료
        </h2>
        {renderTodos("done")}
      </div>
    </div>
  );
};

export default TodoList;
