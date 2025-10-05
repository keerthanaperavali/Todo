import React, { useState } from "react";
import "./App.css";

function formatDateTime(date) {
  if (!date) return "";
  return date.toLocaleString("en-IN", {
    hour12: false,
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");

  const handleInputChange = e => setInputTask(e.target.value);

  const handleAddTask = () => {
    if (inputTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          text: inputTask,
          createdAt: new Date(),
          completed: false,
          completedAt: null
        }
      ]);
      setInputTask("");
    }
  };

  const handleDeleteTask = index => {
    setTasks(tasks => tasks.filter((_, i) => i !== index));
  };

  const handleCompleteTask = index => {
    setTasks(tasks =>
      tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : null
            }
          : task
      )
    );
  };

  return (
    <div className="app-bg">
      <div className="todo-card">
        <h1 className="title">To-Do-List</h1>
        <div className="input-row">
          <input
            type="text"
            className="input"
            value={inputTask}
            onChange={handleInputChange}
            placeholder="What needs to be done?"
            autoFocus
          />
          <button className="btn add" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, idx) => (
            <li className="task" key={idx}>
              <div className="task-main">
                <span
                  className={`task-text${task.completed ? " completed" : ""}`}
                >
                  {task.text}
                </span>
                <div className="meta">
                  <span>Added: {formatDateTime(task.createdAt)}</span>
                  {task.completed && (
                    <span className="complete-meta">
                      | Completed: {formatDateTime(task.completedAt)}
                    </span>
                  )}
                </div>
              </div>
              <div className="actions">
                <button
                  className={`btn complete${task.completed ? " marked" : ""}`}
                  onClick={() => handleCompleteTask(idx)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button className="btn delete" onClick={() => handleDeleteTask(idx)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <div className="empty">No tasks. Add your first!</div>}
      </div>
    </div>
  );
}

export default App;
