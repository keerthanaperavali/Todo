import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');

  const handleInputChange = (event) => {
    setInputTask(event.target.value);
  };

  const handleAddTask = () => {
    if (inputTask.trim() !== '') {
      setTasks([...tasks, inputTask]);
      setInputTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input type="text" value={inputTask} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;