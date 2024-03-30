import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/taskList/taskList.jsx';
import TaskForm from './components/taskForms/taskForm.jsx';
import './index.css';
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import './App.css'

function App() {
  return (
    <Provider store={store}>

    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Manager</h1>
        </header>
          <Routes>
            <Route exact path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
      </div>
    </Router>
    </Provider>

  );
}

export default App;