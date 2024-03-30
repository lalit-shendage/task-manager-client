import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask } from "../../store/actions/taskActions";
import "./taskForm.css";

const TaskForm = ({ addTask, updateTask, tasks }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "",
  });

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task._id === id);
      if (taskToEdit) {
        setFormData(taskToEdit);
      }
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTask(id, formData);
    } else {
      await addTask(formData);
    }
    navigate("/");
  };

  return (
    <div className="task-form">
      <h2>{id ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
        </select>

        <button type="submit">{id ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, { addTask, updateTask })(TaskForm);
