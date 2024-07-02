/* eslint-disable react/prop-types */

const TodoList = ({ todos }) => {
  return (
    <div>
      <h2>할 일 목록</h2>
      <ul>
        {todos.map((todo, index) => {
          <li key={index}>{todo}</li>;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
