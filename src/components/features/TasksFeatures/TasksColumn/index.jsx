import React from "react";

import { useSelector } from "react-redux";
import { getSelectedTaskId } from "../../../../store/ui/tasksPage";

import { TransitionGroup } from "react-transition-group";

import Button from "../../../common/Button";
import Task from "../../TaskFeatures/Task";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksColumn({ column, onNewTask, data: tasks }) {
  const selectedTaskId = useSelector(getSelectedTaskId);

  return (
    <div className={styles.column} key={column.value}>
      <div className={styles.head}>
        <span
          className={`${styles.name} ${
            styles[column.value ? column.value : "unset"]
          }`}
        >
          {column.label}
        </span>
        <Button
          icon={faPlus}
          className={styles.add}
          onClick={() => onNewTask(column.value)}
        />
      </div>
      <TransitionGroup className={styles.body}>
        {tasks.map(
          (task) =>
            task.createdAt &&
            selectedTaskId !== task._id && (
              <Task
                table
                task={task}
                timeout={300}
                classNames="task-transition"
                key={`table ${task._id}`}
              />
            )
        )}
      </TransitionGroup>
    </div>
  );
}

export default TasksColumn;
