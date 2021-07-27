import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import * as uuid from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //store, save, and load a todo item

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodos(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === " ") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid.v4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "250px",
        backgroundImage: "linear-gradient(white, blue)",
      }}
    >
      <h2>TO DO LIST</h2>
      <ToDoList todos={todos} toggleTodos={toggleTodos} />
      <input ref={todoNameRef} type='text'></input>
      <br />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Todo</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
