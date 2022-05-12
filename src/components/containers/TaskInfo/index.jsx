import React from "react";

import Status from "../../common/Status";
import Priority from "../../common/Priority";

import { getEdited } from "../../../helpers/dateHelpers";

import styles from "./index.module.scss";

function TaskInfo({ status, priority, updatedAt, onChange }) {
  return (
    <div className={styles.info}>
      <div className={styles.badges}>
        <Status status={status} priority={priority} onChange={onChange} />
        <Priority priority={priority} onChange={onChange} />
      </div>
      <span className={styles.date}>{getEdited(updatedAt)}</span>
    </div>
  );
}

export default TaskInfo;
