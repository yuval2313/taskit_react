import React, { useContext } from "react";
import TaskContext from "../../context/TaskContext";

import Status from "../../common/Status";
import Priority from "../../common/Priority";

import { getEdited } from "../../../helpers/dateHelpers";

import styles from "./index.module.scss";

function TaskInfo() {
  const { task } = useContext(TaskContext);
  const { updatedAt } = task;

  return (
    <div className={styles.info}>
      <div className={styles.badges}>
        <Status />
        <Priority />
      </div>
      <span className={styles.date}>{getEdited(updatedAt)}</span>
    </div>
  );
}

export default TaskInfo;
