import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";
function Loading() {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </div>
  );
}

export default Loading;
