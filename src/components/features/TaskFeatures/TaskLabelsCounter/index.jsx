import React from "react";

import Icon from "../../../common/Icon";

import { faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabelsCounter({ selected, labelsCount, displayCount }) {
  const counter = labelsCount - displayCount;
  return (
    !selected &&
    counter > 0 && (
      <div className={styles.container}>
        <Icon className={styles.icon} icon={faTag} />
        <span className={styles.counter}>{`+${counter}`}</span>
      </div>
    )
  );
}

export default TaskLabelsCounter;
