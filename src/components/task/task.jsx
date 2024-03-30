import React from 'react';
import './Task.css';

const Task = ({ task }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p className="priority">Priority: {task.priority}</p>
      <p className="category">Category: {task.category}</p>
    </div>
  );
};

export default Task;
