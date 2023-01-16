import React from "react";

import TasksSelected from "../TasksSelected";
import TasksGrid from "../TasksGrid";
import TasksTable from "../TasksTable";
import TasksPlaceholder from "components/TasksPlaceholder";

import styles from "./index.module.scss";

function TasksDisplay({
  view,
  tableSort,
  tasks,
  selectedTaskId,
  onNewTask,
  newTaskProperties,
}) {
  function isGridView() {
    return view === "grid";
  }
  function isTableView() {
    return view === "table";
  }
  function noTasks() {
    return !tasks.length;
  }

  return (
    <div className={styles.container}>
      <TasksPlaceholder
        className={`${styles.placeholder} ${noTasks() ? styles.active : ""}`}
      />
      <div className={styles.display}>
        <TasksSelected
          selectedTaskId={selectedTaskId}
          newTaskProperties={newTaskProperties}
        />
        <div className={`${styles.grid} ${isGridView() ? styles.active : ""}`}>
          {isGridView() && (
            <TasksGrid tasks={tasks} selectedTaskId={selectedTaskId} />
          )}
        </div>
        <div
          className={`${styles.table} ${isTableView() ? styles.active : ""}`}
        >
          {isTableView() && (
            <TasksTable
              tableSort={tableSort}
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              onNewTask={onNewTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TasksDisplay;
