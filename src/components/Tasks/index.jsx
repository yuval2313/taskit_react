import React, { useState, useEffect, useRef } from "react";
import TasksContext from "../../context/TasksContext";

import Input from "../common/Input";
import Button from "../common/Button";
import SortTasks from "../SortTasks";
import TasksGrid from "../TasksGrid";

import { getTasks, saveTask, deleteTask } from "../../services/taskService";
import { logoutUser } from "../../services/authService";

import _ from "lodash";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const newTaskId = useRef(0);

  useEffect(() => {
    populateTasks();
  }, []);

  async function populateTasks() {
    try {
      const { data: tasks } = await getTasks();
      return setTasks(tasks);
    } catch (ex) {
      console.log(ex);
      const { response } = ex;
      if (response.status !== 404) console.log(response.data);
      if (response.status === (400 || 401)) {
        logoutUser();
        window.location = "/";
      }
    }
  }

  async function handleSave(task) {
    console.log("saving..." + task._id);
    const taskClone = { ...task };
    if (!task.createdAt) {
      delete taskClone._id;
    }

    try {
      const { data: taskInDb } = await saveTask(taskClone);
      handleChange(task, taskInDb);
    } catch (ex) {
      const { response } = ex;
      alert(response.data);
    }
  }

  function handleChange(task, taskInDb) {
    const tasksClone = [...tasks];
    const index = tasks.indexOf(tasks.filter((t) => task._id === t._id)[0]);
    tasksClone[index] = taskInDb ? taskInDb : task;
    setTasks(tasksClone);
  }

  async function handleDelete(task) {
    const backupTasks = { ...tasks };

    const filteredTasks = tasks.filter((t) => t._id !== task._id);
    setTasks(filteredTasks);
    handleExit();

    try {
      if (task.createdAt) await deleteTask(task._id);
    } catch (ex) {
      const { response } = ex;
      alert(response.data);

      setTasks(backupTasks);
      handleSelect(task);
    }
  }

  function handleNewTask() {
    const _id = ++newTaskId.current;
    const newTask = {
      _id,
      title: "",
      content: "",
      status: "",
      priority: "",
      labels: [],
    };
    setSearchQuery("");
    setTasks([newTask, ...tasks]);
    handleSelect(newTask);
  }

  function handleSelect(taskId) {
    setSearchQuery("");
    setSelectedTaskId(taskId);
  }

  function handleExit() {
    setSelectedTaskId("");
  }

  function handleSearch({ currentTarget }) {
    const { value: query } = currentTarget;
    setSearchQuery(query);
  }

  function handleSortBy(task) {
    let iterate = task[sortBy];

    if (sortBy === "title") iterate = task[sortBy].toLowerCase();
    if (sortBy === "status") {
      const statusOrder = { "": 0, todo: 1, doing: 2, complete: 3 };
      iterate = statusOrder[task[sortBy]];
    }
    if (sortBy === "priority") {
      const priorityOrder = { "": 0, low: 1, medium: 2, high: 3, urgent: 4 };
      iterate = priorityOrder[task[sortBy]];
    }

    return iterate;
  }

  function getSortedTasks(tasks) {
    const sortedTasks = _.orderBy(tasks, handleSortBy, sortOrder);
    return sortedTasks;
  }

  function getFilteredTasks(tasks) {
    const filteredTasks = searchQuery
      ? tasks.filter(
          (t) =>
            t.title.match(new RegExp(`${searchQuery}`, "i")) ||
            t.content.match(new RegExp(`${searchQuery}`, "i"))
        )
      : tasks;
    return filteredTasks;
  }

  function getData() {
    const sortedTasks = getSortedTasks(tasks);

    const filteredTasks = getFilteredTasks(sortedTasks);

    return filteredTasks;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        onSave: handleSave,
        onChange: handleChange,
        onDelete: handleDelete,
        onSelect: handleSelect,
        onExit: handleExit,
      }}
    >
      <main className="tasks-container">
        <div className="tasks-head">
          <div className="tasks-search">
            <Input
              name="search"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button icon={faPlus} onClick={handleNewTask} tooltip="Add Task" />
          </div>
          <div className="tasks-order">
            <SortTasks
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>
        <hr className="separator" />
        <TasksGrid tasks={getData()} selectedTaskId={selectedTaskId} />
      </main>
    </TasksContext.Provider>
  );
}

export default Tasks;
