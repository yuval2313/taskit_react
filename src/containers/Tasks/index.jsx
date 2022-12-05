import React, { useEffect, useState, useRef } from "react";
import TasksContext from "context/TasksContext";

import { useDispatch, useSelector } from "react-redux";
import { getTasks, isLoading, fetchTasks } from "store/entities/tasks";
import { getLabelById } from "store/entities/labels";
import { getSelectedLabelId, deselectLabel } from "store/ui";

import Separator from "components/Separator";
import Loading from "components/Loading";
import TasksHead from "./components/TasksHead";
import TasksDisplay from "./components/TasksDisplay";

import {
  getSortedTasks,
  getFilteredTasks,
  getLabeledTasks,
} from "helpers/tasksHelpers";
import { useLogout } from "hooks/useLogout";

import styles from "./index.module.scss";

function Tasks() {
  const [newTaskProperties, setNewTaskProperties] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("desc");
  const [view, setView] = useState("grid");
  const [tableSort, setTableSort] = useState("status");

  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const loading = useSelector(isLoading);
  const selectedLabelId = useSelector(getSelectedLabelId);
  const selectedLabel = useSelector(getLabelById(selectedLabelId));

  const logout = useLogout();

  useEffect(() => {
    populateTasks();
  }, []);

  async function populateTasks() {
    try {
      await dispatch(fetchTasks()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === 400 || status === 401) {
        return logout();
      }
    }
  }

  const newTaskId = useRef(1);
  function handleNewTask({ currentTarget }) {
    const { value } = currentTarget;

    setNewTaskProperties({
      title: searchQuery,
      labels: selectedLabelId ? [selectedLabelId] : [],
      [tableSort]: value && view === "table" ? value : "",
    });

    return handleSelectTask(newTaskId.current++);
  }

  function handleSelectTask(taskId) {
    return setSelectedTaskId(taskId);
  }
  function handleDeselectTask() {
    return setSelectedTaskId("");
  }

  function handleDeselectLabel() {
    return dispatch(deselectLabel());
  }

  function handleSearch({ currentTarget }) {
    const { value: query } = currentTarget;
    return setSearchQuery(query);
  }

  function handleSortBy(sortBy) {
    return setSortBy(sortBy);
  }
  function handleToggleSortOrder() {
    return sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
  }

  function handleToggleView() {
    return view === "grid" ? setView("table") : setView("grid");
  }
  function handleToggleTableSort() {
    return tableSort === "status"
      ? setTableSort("priority")
      : setTableSort("status");
  }

  function getData() {
    const sortedTasks = getSortedTasks(tasks, sortBy, sortOrder);

    const filteredTasks = getFilteredTasks(sortedTasks, searchQuery);

    const labeledTasks = getLabeledTasks(filteredTasks, selectedLabelId);

    return labeledTasks;
  }

  return (
    <TasksContext.Provider
      value={{
        searchQuery,
        handleSelectTask,
        handleDeselectTask,
      }}
    >
      <main className={styles.container}>
        <TasksHead
          searchQuery={searchQuery}
          sortBy={sortBy}
          sortOrder={sortOrder}
          view={view}
          tableSort={tableSort}
          selectedLabel={selectedLabel}
          onSearch={handleSearch}
          onSortBy={handleSortBy}
          onToggleSortOrder={handleToggleSortOrder}
          onToggleView={handleToggleView}
          onToggleTableSort={handleToggleTableSort}
          onDeselectLabel={handleDeselectLabel}
          onNewTask={handleNewTask}
        />
        {view === "grid" && <Separator className={styles.separator} />}
        {loading ? (
          <Loading className={styles.loading} />
        ) : (
          <TasksDisplay
            tasks={getData()}
            selectedTaskId={selectedTaskId}
            view={view}
            tableSort={tableSort}
            onNewTask={handleNewTask}
            newTaskProperties={newTaskProperties}
          />
        )}
      </main>
    </TasksContext.Provider>
  );
}

export default Tasks;
