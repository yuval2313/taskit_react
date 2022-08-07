import React, { useContext } from "react";
import TaskContext from "context/TaskContext";

import TaskStatus from "../TaskStatus";
import TaskPriority from "../TaskPriority";

import { getEdited } from "../../../../helpers/dateHelpers";

import styles from "./index.module.scss";

function TaskInfo({ status, priority, updatedAt, onChange }) {
  const { table } = useContext(TaskContext);

  return (
    <div className={`${styles.container} ${table ? styles.table : ""}`}>
      <div className={styles.badges}>
        <TaskStatus
          status={status}
          onChange={onChange}
          priorityStyle={priority}
        />
        <TaskPriority priority={priority} onChange={onChange} />
      </div>
      <span className={styles.date}>{getEdited(updatedAt)}</span>
    </div>
  );
}

export default TaskInfo;
