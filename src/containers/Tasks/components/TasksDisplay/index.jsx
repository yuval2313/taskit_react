import React from "react";

import TasksSelected from "../TasksSelected";
import TasksGrid from "../TasksGrid";
import TasksTable from "../TasksTable";

import styles from "./index.module.scss";

function TasksDisplay({ view, tableSort, tasks, selectedTaskId, onNewTask }) {
  function isGridView() {
    return view === "grid";
  }

  function isTableView() {
    return view === "table";
  }

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <TasksSelected tasks={tasks} selectedTaskId={selectedTaskId} />
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
