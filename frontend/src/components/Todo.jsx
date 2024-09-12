// to render all of our todo lists easily
import React from "react";
import "../styles/Todo.css";

function Todo({ todo, onDelete }) {
  const formattedDate = new Date(todo.created_at).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
  const formattedDeadline = new Date(todo.deadline).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
  return (
    <div className="todo-container">
      <h3 className="todo-title">{todo.title}</h3>
      <p className="todo-content">{todo.content}</p>
      <p className="todo-date">{formattedDate}</p>
      <p className="todo-deadline">Deadline: {formattedDeadline}</p>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default Todo;
