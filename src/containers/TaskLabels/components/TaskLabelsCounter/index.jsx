import React from "react";

import Icon from "components/Icon";

import { faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabelsCounter({ labelsCount, displayCount }) {
  const counter = labelsCount - displayCount;
  return (
    counter > 0 && (
      <div className={styles.container}>
        <Icon className={styles.icon} icon={faTag} />
        <span className={styles.counter}>{`+${counter}`}</span>
      </div>
    )
  );
}

export default TaskLabelsCounter;
