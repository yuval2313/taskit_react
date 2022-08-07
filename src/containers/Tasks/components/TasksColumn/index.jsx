import React from "react";

import { TransitionGroup } from "react-transition-group";

import Button from "components/Button";
import Task from "containers/Task";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksColumn({ column, onAddTask, data: tasks, selectedTaskId }) {
  function isSelected(task) {
    return selectedTaskId === task._id;
  }

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
          onClick={() => onAddTask(column.value)}
        />
      </div>
      <TransitionGroup className={styles.body}>
        {tasks.map(
          (task) =>
            task.createdAt && (
              <Task
                table
                hidden={isSelected(task)}
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
