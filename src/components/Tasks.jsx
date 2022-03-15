import React, { useState, useEffect, useRef } from "react";
import TasksGrid from "./TasksGrid";

import Input from "./common/Input";
import Button from "./common/Button";
import SortTasks from "./SortTasks";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getTasks, saveTask, deleteTask } from "../services/taskService";

import _ from "lodash";

import TasksContext from "./../context/TasksContext";

import "../styles/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [expanding, setExpanding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const newTaskId = useRef(1);

  useEffect(() => {
    populateTasks();
  }, []);

  async function populateTasks() {
    try {
      const { data: tasks } = await getTasks();
      return setTasks(tasks);
    } catch (ex) {
      const { response } = ex;
      if (response.status !== 404) alert(response.data);
    }
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

  async function handleDelete(task) {
    const backupTasks = { ...tasks };

    const filteredTasks = tasks.filter((t) => t._id !== task._id);
    setTasks(filteredTasks);

    try {
      if (task.createdAt) await deleteTask(task._id);
      setSelectedTask();
    } catch (ex) {
      const { response } = ex;
      alert(response.data);

      setTasks(backupTasks);
    }
  }

  function handleNewTask() {
    const _id = newTaskId.current++;
    const newTask = {
      _id,
      title: "",
      content: "",
      status: "",
      new: true,
    };
    setTasks([newTask, ...tasks]);
    setSelectedTask(newTask);
    handleExpand();
  }

  function handleSelect(taskId) {
    const selectedTask = tasks.filter((t) => t._id === taskId)[0];
    setSelectedTask(selectedTask);
    handleExpand();
  }

  function handleExpand() {
    setExpanding(true);
    return setTimeout(() => setExpanding(false), 500);
  }

  function handleExit() {
    setSelectedTask();
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

    return iterate;
  }

  function getSortedTasks() {
    const sortedTasks = _.orderBy(tasks, handleSortBy, sortOrder);
    return sortedTasks;
  }

  function getFilteredTasks() {
    const sortedTasks = getSortedTasks();

    const filteredTasks = searchQuery
      ? sortedTasks.filter(
          (t) =>
            t.title.match(new RegExp(`${searchQuery}`, "i")) ||
            t.content.match(new RegExp(`${searchQuery}`, "i"))
        )
      : sortedTasks;
    return filteredTasks;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        expanding,
        searchQuery,
        onExit: handleExit,
        onSave: handleSave,
        onDelete: handleDelete,
        onSelect: handleSelect,
      }}
    >
      <div className="tasks-container">
        <div className="tasks-head">
          <div className="tasks-search">
            <Input
              name="search"
              type="search"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <Button icon={faPlus} onClick={handleNewTask} />
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
        <TasksGrid
          selectedTask={selectedTask}
          filteredTasks={getFilteredTasks()}
        />
      </div>
    </TasksContext.Provider>
  );
}

export default Tasks;
