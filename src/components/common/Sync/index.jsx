import React from "react";
import { useSelector } from "react-redux";
import { isSynced } from "../../../store/entities/tasks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSyncAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function Sync() {
  const synced = useSelector(isSynced);

  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faCloud} />
        <span
          className={`${styles.indicator} ${!synced ? styles.syncing : ""}`}
        >
          {synced ? (
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
