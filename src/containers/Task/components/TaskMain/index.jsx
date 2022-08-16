import React from "react";

import Button from "components/Button";
import Separator from "components/Separator";
import TaskTextarea from "components/TaskTextarea";

import styles from "./index.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function TaskMain({
  title,
  content,
  searchQuery,
  onChange,
  onDelete,
  selected,
  table,
}) {
  return (
    <div
      className={`${styles.main} ${selected ? styles.selected : ""} ${
        table ? styles.table : ""
      }`}
    >
      {!selected && (
        <div className={styles.topbar}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              return onDelete();
            }}
            icon={faTimes}
            tooltip="Delete Task"
          />
        </div>
      )}
      <div className={styles.title}>
        <TaskTextarea
          selected={selected}
          searchQuery={searchQuery}
          value={title}
          name={"title"}
          placeholder={"Title"}
          maxLength={100}
          autoFocus={!title}
          onChange={onChange}
        />
      </div>
      <Separator className={styles.separator} />
      <div className={styles.content}>
        <TaskTextarea
          selected={selected}
          searchQuery={searchQuery}
          value={content}
          name={"content"}
          placeholder={"Empty..."}
          maxLength={5000}
          minRows={15}
          autoFocus={title && !content}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default TaskMain;
