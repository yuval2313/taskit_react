import React from "react";

import Button from "../../common/generic/Button";
import Separator from "../../common/generic/Separator";
import TaskTextarea from "../../common/TaskTextarea";

import styles from "./index.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function TaskMain({ onDelete, onChange, title, content, selected }) {
  return (
    <div className={`${styles.main} ${selected ? styles.selected : ""}`}>
      <div className={styles.topbar}>
        {!selected && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              return onDelete();
            }}
            icon={faTimes}
            tooltip="Delete Task"
          />
        )}
      </div>
      <div className={styles.title}>
        <TaskTextarea
          selected={selected}
          name={"title"}
          value={title}
          placeholder={"Title"}
          onChange={onChange}
          rows={3}
          maxLength={100}
          autoFocus={!title}
        />
      </div>
      <Separator />
      <div className={styles.content}>
        <TaskTextarea
          selected={selected}
          name={"content"}
          value={content}
          placeholder={"Empty..."}
          onChange={onChange}
          maxLength={5000}
          minRows={15}
          autoFocus={title && !content}
        />
      </div>
    </div>
  );
}

export default TaskMain;
