import React from "react";

import TaskStatus from "../TaskStatus";
import TaskPriority from "../TaskPriority";

import { getEdited } from "../../../../helpers/dateHelpers";

import styles from "./index.module.scss";

function TaskInfo({ status, priority, updatedAt, onChange, table }) {
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
