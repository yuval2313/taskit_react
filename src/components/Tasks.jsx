import React, { useState, useEffect, useRef } from "react";
import TasksGrid from "./TasksGrid";

import Button from "./common/Button";
import SearchBar from "./common/SearchBar";

import { getTasks, saveTask } from "../services/taskService";

import TasksContext from "./../context/TasksContext";

import "../styles/Tasks.css";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskId = useRef(1);

  useEffect(() => {
    populateTasks();
  }, []);

  async function populateTasks() {
    const { data: tasks } = await getTasks();
    return setTasks(tasks);
  }

  async function handleSave(task) {
    const taskClone = { ...task };
    if (task.new) {
      delete taskClone._id;
    }

    try {
      const { data: taskInDb } = await saveTask(taskClone);

      const tasksClone = [...tasks];
      const index = tasks.indexOf(task);
      tasksClone[index] = taskInDb;
      setTasks(tasksClone);

      return handleExit();
    } catch (ex) {
      const { response } = ex;
      alert(response.data);
    }
  }

  function handleNewTask() {
    const _id = newTaskId.current++;
    const newTask = { _id, title: "", content: "", status: "toDo", new: true };
    setTasks([newTask, ...tasks]);
    setSelectedTask(newTask);
  }

  function handleExpand(taskId) {
    const selectedTask = tasks.filter((t) => t._id === taskId)[0];
    setSelectedTask(selectedTask);
    console.log(selectedTask);
  }

  function handleExit() {
    setSelectedTask();
  }

  function handleSearch({ currentTarget }) {
    const { value: query } = currentTarget;
    setSearchQuery(query);
  }

  function getFilteredTasks() {
    const filteredTasks = searchQuery
      ? tasks.filter(
          (t) =>
            t.title.match(new RegExp(`${searchQuery}`, "i")) ||
            t.content.match(new RegExp(`${searchQuery}`, "i"))
        )
      : tasks;
    return filteredTasks;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        filteredTasks: getFilteredTasks(),
        searchQuery,
      }}
    >
      <div className="tasks-container">
        <div className="tasks-head">
          <SearchBar
            name="search"
            placeholder="Search By Title..."
            onChange={handleSearch}
          />
          <Button
            className={"btn btn-blue btn-bg"}
            label="Add"
            onClick={handleNewTask}
          />
        </div>
        <hr className="separator" />
        <TasksGrid
          selectedTask={selectedTask}
          handleExit={handleExit}
          handleSave={handleSave}
          handleExpand={handleExpand}
        />
      </div>
    </TasksContext.Provider>
  );
}

export default Tasks;
