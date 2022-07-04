import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTasks,
  isLoading,
  fetchTasks,
  addTask,
} from "../../../../store/entities/tasks";
import {
  getSearchQuery,
  queryTasks,
  clearQuery,
  getSortBy,
  getSortOrder,
  getView,
} from "../../../../store/ui/tasksPage";
import { getSelectedLabelId } from "../../../../store/ui/labelsSideBar";

import Separator from "../../../common/Separator";
import Loading from "../../../common/Loading";
import TasksHead from "../TasksHead";
import TasksDisplay from "../TasksDisplay";

import _ from "lodash";

import styles from "./index.module.scss";

function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector(getTasks);
  const loading = useSelector(isLoading);
  const searchQuery = useSelector(getSearchQuery);
  const sortBy = useSelector(getSortBy);
  const sortOrder = useSelector(getSortOrder);
  const selectedLabelId = useSelector(getSelectedLabelId);
  const view = useSelector(getView);

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
    dispatch(
      addTask({
        title: searchQuery,
        labels: selectedLabelId ? [selectedLabelId] : [],
      })
    );

    if (searchQuery) dispatch(clearQuery());
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

  function getLabeledTasks(tasks) {
    const labeledTasks = selectedLabelId
      ? tasks.filter((t) => t.labels.indexOf(selectedLabelId) !== -1)
      : tasks;
    return labeledTasks;
  }

  function getData() {
    const sortedTasks = getSortedTasks(tasks);

    const filteredTasks = getFilteredTasks(sortedTasks);

    const labeledTasks = getLabeledTasks(filteredTasks);

    return labeledTasks;
  }

  return (
    <main className={styles.container}>
      <TasksHead onSearch={handleSearch} onNewTask={handleNewTask} />
      {view === "grid" && <Separator className={styles.separator} />}
      {loading ? (
        <Loading className={styles.loading} />
      ) : (
        <TasksDisplay tasks={getData()} />
      )}
    </main>
  );
}

export default Tasks;
