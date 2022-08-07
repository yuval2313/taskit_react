import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSyncAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function Sync({ synced }) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faCloud} />
        <span className={`${styles.indicator} ${synced ? "" : styles.syncing}`}>
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
