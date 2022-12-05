import React from "react";

import Button from "components/Button";
import TaskAddEvent from "../TaskAddEvent";

import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskFooter({ priority, onExit, onDelete }) {
  return (
    <div className={styles.footer}>
      <div className={styles.toolbar}>
        <TaskAddEvent priorityStyle={priority} />
        <Button icon={faTrashAlt} onClick={onDelete} />
      </div>
      <Button className={styles.save} onClick={onExit}>
        Close
      </Button>
    </div>
  );
}

export default TaskFooter;
