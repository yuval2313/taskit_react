import React, { useContext } from "react";
import TaskContext from "../../context/TaskContext";

import Button from "../../common/generic/Button";
import Separator from "../../common/generic/Separator";
import TaskTextarea from "../../common/TaskTextarea";

import styles from "./index.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function TaskMain() {
  const { task, handlers } = useContext(TaskContext);

  const { title, content, selected } = task;
  const { handleDelete } = handlers;

  return (
    <div className={`${styles.main} ${selected ? styles.selected : ""}`}>
      <div className={styles.topbar}>
        {!selected && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              return handleDelete();
            }}
            icon={faTimes}
            tooltip="Delete Task"
          />
        )}
      </div>
      <div className={styles.title}>
        <TaskTextarea
          name={"title"}
          value={title}
          placeholder={"Title"}
          rows={3}
          maxLength={100}
          autoFocus={!title}
        />
      </div>
      <Separator />
      <div className={styles.content}>
        <TaskTextarea
          name={"content"}
          value={content}
          placeholder={"Empty..."}
          maxLength={5000}
          minRows={15}
          autoFocus={title && !content}
        />
      </div>
    </div>
  );
}

export default TaskMain;
