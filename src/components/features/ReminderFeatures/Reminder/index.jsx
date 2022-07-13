import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTaskById } from "../../../../store/entities/tasks";
import { selectTask } from "../../../../store/ui/tasksPage";

import { displayReminderDateTime } from "../../../../helpers/dateHelpers";
import withHover from "../../../hoc/withHover";

import Hover from "../../../common/Hover";
import Button from "../../../common/Button";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function Reminder({ reminder, hovering }) {
  const dispatch = useDispatch();
  const {
    _id: taskId,
    title,
    priority,
  } = useSelector(getTaskById(reminder.taskId));

  return (
    <div
      className={`${styles.container} ${
        priority ? styles[priority] : styles.prt_unset
      }`}
      onClick={() => dispatch(selectTask(taskId))}
    >
      <span className={styles.main}>
        <span className={`${styles.title} ${!title ? styles.untitled : ""}`}>
          {title ? title : "Untitled"}
        </span>
        <span className={styles.date}>
          {displayReminderDateTime(reminder.dateTime)}
        </span>
      </span>
      <Hover
        in={hovering}
        classNames="hover-transition"
        timeout={300}
        unmountOnExit
      >
        <Button icon={faCheck} />
      </Hover>
    </div>
  );
}

export default withHover(Reminder);
