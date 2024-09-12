// PROBLEM!!! AXIOSERROR: REQUEST FAILED WITH STATUS CODE 500
//     raise TypeError(f'Object of type {o.__class__.__name__} '
// TypeError: Object of type type is not JSON serializable

import { useState, useEffect } from "react";
import api from "../api";
import Todo from "../components/Todo";
import "../styles/Home.css";

function Home() {
  // show all of the todo list that user has
  const [todos, setTodos] = useState([]);
  // state for the content and title of todos
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(
    new Date().toISOString().slice(0, 16)
  );
  // State to manage visible todos(for load more feature)
  const [visibleTodos, setVisibleTodos] = useState(7);

  useEffect(() => {
    getTodos();
  }, []);

  //   show all of the todo list
  const getTodos = () => {
    api
      .get("/api/todos/")
      .then((res) => res.data)
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((err) => alert(err)); // catch error and show it on screen
  };
  //   delet todo list
  const deleteTodo = (id) => {
    // the idea is when we delete agenda, we want to update the page by calling getTodos func
    api
      .delete(`/api/todos/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Agenda deleted!");
        else alert("Failed to delete agenda.");
        getTodos();
      })
      .catch((error) => alert(error));
  };

  // creating todo list
  // e is from form
  const createTodo = (e) => {
    e.preventDefault();
    api
      // gak tau, mungkin harus ganti isi nya karena beda
      .post("/api/todos/", { content, title, deadline })
      .then((res) => {
        if (res.status === 201) alert("Agenda created!");
        else alert("Failed to make agenda.");
        getTodos();
      })
      .catch((err) => alert(err));
  };
  // dari copilot untuk show datetime
  const handleDateTimeChange = (event) => {
    setDeadline(event.target.value);
  };
  // Sort todos by nearest deadline
  const sortedTodos = todos.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  // apply load more feature
  const loadMoreTodos = () => {
    setVisibleTodos((prevVisibleTodos) => prevVisibleTodos + 7);
  };
  return (
    <div>
      {/* Displaying the agendas */}
      <h2>Todo Lists</h2>
      <div className="todo-list">
        {/* render all of todo lists components */}
        {/* apply sortedTodos to map the func */}
        {/* slicing todos for max 7 todos in 1 page */}
        {sortedTodos.slice(0, visibleTodos).map((todo) => (
          <Todo todo={todo} onDelete={deleteTodo} key={todo.id} />
        ))}
      </div>
      {/* button for load more feature */}
      {visibleTodos < todos.length && (
        <button onClick={loadMoreTodos} className="load-more-button">
          Load More
        </button>
      )}
      {/* Creating todo list */}
      <h2>Create a todo list</h2>
      <form onSubmit={createTodo}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {/* oke problem ada mulai baris ini */}
        <br />
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="datetime-local"
          name="deadline"
          id="deadline"
          value={deadline}
          onChange={handleDateTimeChange}
        />
        {/* gimana caranya bikin completed/not nya juga */}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
