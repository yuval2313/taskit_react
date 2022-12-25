import React from "react";

import Button from "components/Button";
import TaskEvent from "containers/TaskEvent";

import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskFooter({ priority, mapToEvent, event, onExit, onDelete }) {
  return (
    <div className={styles.footer}>
      <div className={styles.toolbar}>
        <Button
          icon={faTrashAlt}
          onClick={onDelete}
          tooltipBottom="Delete Task"
        />
        <TaskEvent
          priorityStyle={priority}
          mapToEvent={mapToEvent}
          event={event}
        />
      </div>
      <Button className={styles.save} onClick={onExit}>
        Close
      </Button>
    </div>
  );
}

export default TaskFooter;
