import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './taskList.css';
import { fetchTasks, deleteTask } from '../../store/actions/taskActions';

const TaskList = ({ tasks, fetchTasks, deleteTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortPriority, setSortPriority] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const filtered = filterCategory
      ? tasks.filter(task => task.category === filterCategory)
      : tasks;
    const sorted = sortPriority
      ? filtered.sort((a, b) => {
          if (sortPriority === 'Low') return a.priority.localeCompare(b.priority);
          if (sortPriority === 'Medium') return a.priority.localeCompare(b.priority);
          if (sortPriority === 'High') return b.priority.localeCompare(a.priority);
        })
      : filtered;
    setFilteredTasks(sorted);
  }, [tasks, filterCategory, sortPriority]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <div className="filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
        </select>
        <select value={sortPriority} onChange={(e) => setSortPriority(e.target.value)}>
          <option value="">Sort by Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <Link to="/add" className="add-task-link">
        Add Task
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</td>
              <td>{task.category}</td>
              <td className="task-actions">
                <Link to={`/edit/${task._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(task._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, { fetchTasks, deleteTask })(TaskList);
