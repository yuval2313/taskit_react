import React from "react";

import Icon from "components/Icon";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksPlaceholder({ className }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div>{"Couldn't find any tasks... \n"}</div>
      <div>
        {"Press "}
        {'"'}
        <Icon icon={faPlusCircle} className={styles.icon} />
        {'"'}
        {" to add a new one!"}
      </div>
    </div>
  );
}

export default TasksPlaceholder;
