import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTasks,
  isLoading,
  fetchTasks,
  addTask,
} from "../../store/entities/tasks";
import {
  getSearchQuery,
  queryTasks,
  getSortBy,
  getSortOrder,
} from "../../store/ui/tasksPage";

import TasksHead from "./../containers/TasksHead/index";
import Separator from "../common/generic/Separator";
import Loading from "../common/generic/Loading";
import TasksGrid from "../containers/TasksGrid";

import _ from "lodash";

import styles from "./index.module.scss";

function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector(getTasks);
  const loading = useSelector(isLoading);
  const searchQuery = useSelector(getSearchQuery);
  const sortBy = useSelector(getSortBy);
  const sortOrder = useSelector(getSortOrder);

  useEffect(() => {
    populateTasks();
  }, []);

  async function populateTasks() {
    try {
      await dispatch(fetchTasks()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === (400 || 401)) {
        window.location = "/logout";
      }
    }
  }

  function handleNewTask() {
    dispatch(addTask());
    dispatch(queryTasks(""));
  }

  function handleSearch({ currentTarget }) {
    const { value: query } = currentTarget;
    dispatch(queryTasks(query));
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
    <div className={styles.container}>
      <TasksHead onSearch={handleSearch} onNewTask={handleNewTask} />
      <Separator />
      {loading ? <Loading /> : <TasksGrid tasks={getData()} />}
    </div>
  );
}

export default Tasks;
