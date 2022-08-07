import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";
function Loading({ className }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </div>
  );
}

Loading.defaultProps = {
  className: "",
};

export default Loading;
