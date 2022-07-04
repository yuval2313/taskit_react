import React, { useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import TaskStatus from "../TaskStatus";
import TaskPriority from "../TaskPriority";

import { getEdited } from "../../../../helpers/dateHelpers";

import styles from "./index.module.scss";

function TaskInfo() {
  const { task } = useContext(TaskContext);
  const { updatedAt, table } = task;

  return (
    <div className={`${styles.info} ${table ? styles.table : ""}`}>
      <div className={styles.badges}>
        <TaskStatus />
        <TaskPriority />
      </div>
      <span className={styles.date}>{getEdited(updatedAt)}</span>
    </div>
  );
}

export default TaskInfo;
