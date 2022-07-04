import React from "react";

import { useSelector } from "react-redux";
import { getSelectedTaskId, getView } from "../../../../store/ui/tasksPage";

import Background from "../../../common/Background";
import TasksGrid from "../TasksGrid";
import TasksTable from "../TasksTable";

import styles from "./index.module.scss";

function TasksDisplay({ tasks, onNewTask }) {
  const selectedTaskId = useSelector(getSelectedTaskId);
  const view = useSelector(getView);

  return (
    <div className={styles.container}>
      <Background
        in={selectedTaskId ? true : false}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <div className={styles.display}>
        <div
          className={`${styles.grid} ${view === "grid" ? styles.active : ""}`}
        >
          <TasksGrid tasks={tasks} />
        </div>
        <div
          className={`${styles.table} ${view === "table" ? styles.active : ""}`}
        >
          <TasksTable tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default TasksDisplay;
