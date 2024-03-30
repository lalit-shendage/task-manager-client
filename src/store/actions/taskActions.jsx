import * as api from '../../api/api'; 
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from './types';

export const fetchTasks = () => async (dispatch) => {
  try {
    const tasks = await api.getAllTasks();
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const addTask = (taskData) => async (dispatch) => {
  try {
    const newTask = await api.createTask(taskData);
    dispatch({ type: ADD_TASK_SUCCESS, payload: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const updatedTask = await api.updateTask(taskId, taskData);
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await api.deleteTask(taskId);
    dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
