import React from "react";
import { useSelector } from "react-redux";
import * as tasks from "../../../store/entities/tasks";
import * as labels from "../../../store/entities/labels";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSyncAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function Sync() {
  const tasksSynced = useSelector(tasks.isSynced);
  const labelsSynced = useSelector(labels.isSynced);

  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faCloud} />
        <span
          className={`${styles.indicator} ${
            tasksSynced && labelsSynced ? "" : styles.syncing
          }`}
        >
          {tasksSynced && labelsSynced ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faSyncAlt} />
          )}
        </span>
      </span>
    </div>
  );
}

export default Sync;
